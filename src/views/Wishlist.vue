<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <table class="w-1/2">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody class="" v-for="(item,index) in item_list">
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
    import WishlistService from '@/services/WishlistService';
    class Item {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }
    }
    export default{
        data(){
            return{
                test: new Item("test", 20),
                item_list: [],
                new_item: new Item('',''),
            }
        },
        async created(){
            try{
                const res = await WishlistService.request();
                console.log(res);
                const wishlistData = res.data;
                console.log(wishlistData);
                wishlistData.forEach(item => {
                    console.log("test");
                    console.log(item);
                    this.item_list.push(new Item(item.name, item.price));
                })
            }
            catch(err){console.error(err)}
        },
        methods: {
            addItem(){
                if(this.new_item.name.trim() !== ''){
                    this.item_list.push(this.new_item);
                    this.new_item = new Item('','');
                }
                console.log(this.item_list[0].name);
            },
            removeItem(index){
                this.item_list.splice(index, 1 );
            },
            changeListItem(){
                       
            }
        }
    }


</script>

<style scoped>
    .wishlist{@apply flex justify-center;}

    .list_item{@apply flex bg-transparent border border-2;}
    .add-button{@apply bg-red-400 w-6;}
</style>
