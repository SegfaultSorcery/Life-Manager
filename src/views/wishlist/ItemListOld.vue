<template>wishlist
    <div class="flex flex-col items-center justify-center min-h-screen">
        <table class="w-1/2">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody class="" v-for="(item,index) in item_list" :key="item.id">
                <tr>
                    <td class="border w-3/4">{{item.name}}</td>
                    <td class="border w-1/4">{{item.price}}</td>
                    <button class="border bg-red-400 w-6" @click="removeItem(index)">-</button>
                </tr>
            </tbody>
        </table>
        <span class="flex justify-center w-1/2 mt-10">
            <input class="bg-transparent border w-3/4" v-model="new_item.name" @keyup.enter="addItem" placeholder="name"></input>
            <input class="bg-transparent border w-1/4" v-model="new_item.price" @keyup.enter="addItem" placeholder="price"></input>
        </span>
    </div> 

</template>

<script>
    import {ref, reactive, computed} from 'vue';
    import WishlistService from '@/services/WishlistService';

    class Item {
        constructor(name, price, id) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }
    export default{
        setup(){
            let item_list = ref([]);
            let new_item = ref(new Item());

            function addItem(){

                const req = {
                    'action': 'add',
                    'item': new_item.value,
                };
                
                if(new_item.value.name.trim() !== ''){
                    try{
                        WishlistService.update(req)
                        .then(res =>{
                            if(res.status === 200){
                                new_item.value.id = res.data.item_id;
                                item_list.value.push(new_item.value);
                                new_item.value = new Item();
                            }
                        })
                    }
                    catch(err){
                        console.error("Faild to add item to database: ", err);

                    }
                } 
            }
            async function removeItem(index){
                console.log("removing Item: ", item_list.value[index].name);
                const item_id  = item_list.value[index].id;
                console.log("with id: ", item_id);
                const req = {
                    'action': 'remove',
                    'item_id': item_id,
                };
                try{
                    await WishlistService.update(req)  
                    .then(res =>{
                        if(res.status === 200){
                            item_list.value.splice(index,1);
                        }
                    })
                }
                catch(err){
                    console.error("Error updating item:", err);
                }
            }
            async function fetchWishlist(){
                try{
                    const res = await WishlistService.request();
                    const wishlistData = res.data;
                    console.log(wishlistData);
                    wishlistData.forEach(item => {
                        console.log(item);
                        item_list.value.push(new Item(item.name, item.price, item.id));
                    })
                }
                catch(err){
                    console.error("Error fetching wishlist:", err);
                    // this.$router.push('login')
                }
            }
            
            fetchWishlist();
            return{
                item_list,
                new_item,
                addItem,
                removeItem,
                fetchWishlist
            }
        }
    }
</script>
