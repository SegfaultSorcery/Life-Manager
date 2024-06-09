<template>
    <v-list>
        <v-toolbar color="accent">
            <v-toolbar-title>
                Wishlist 
            </v-toolbar-title>
        </v-toolbar>
        <v-expansion-panels flat multiple>
            <v-expansion-panel v-for="(category, index) in categories" :key="index">
                <v-expansion-panel-title>
                    <div class="flex justify-between items-center w-full">
                        <span class="font-bold"> 
                            <span>{{ category.name }} ({{ category.items.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2) }})</span>
                        </span>
                        <div>
                            <v-btn 
                                icon="mdi-plus" 
                                density="compact" 
                                @click.stop="addItem" 
                                >
                                <v-icon color="accent"></v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-simple-table class="d-flex flex-column">
                        <template #default>
                            <thead>
                                <tr class="flex w-full py-4">
                                    <th class="w-1/3">Item</th>
                                    <th class="w-1/3">Price</th>
                                    <th class="w-1/3 ">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="flex items-center w-full py-2" v-for="(items, index) in category.items">
                                    <td class="w-1/3"> 
                                        <div class="flex w-full justify-center">
                                            {{items.name}}
                                        </div>
                                    </td>
                                    <td class="w-1/3"> 
                                        <div class="flex justify-center">
                                            {{items.price}} 
                                        </div>
                                    </td>
                                    <td class="w-1/3">
                                        <div class="flex justify-center items-center">
                                            <v-btn 
                                                icon="mdi-delete" 
                                                density="compact" 
                                                @click="removeItem(subIndex)"
                                                >
                                                <v-icon color="red"></v-icon>
                                            </v-btn>
                                            <v-btn
                                                icon="mdi-pencil"
                                                density="compact" 
                                                @click=""
                                                >
                                                <v-icon color="blue"></v-icon>
                                            </v-btn>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-list>
</template>

<script setup>
    import {ref, reactive, computed} from 'vue';
    import WishlistService from '@/services/WishlistService';

    class Item {
        constructor(name, price, id) {
            this.id = id;
            this.name = name;
            this.price = price;
        }
    }

            let item_list = ref([]);
            let new_item = ref(new Item());

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
                    console.error("Error updating item");
                }
            }
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

            const groupBy = [
                {key: 'name', order:'asc'}
            ]

            const headers = [
                {title: "Item", algin: 'start', key:'items'},
                {title: "Price", key:"price"}
            ];

            const categories = [
                {
                    name: 'Books',
                    items: [
                        { name: 'Book 1', price: '10' },
                        { name: 'Book 2', price: '15' },
                        { name: 'Book 3', price: '20' }
                    ]
                },
                {
                    name: 'Electronics',
                    items: [
                        { name: 'Electronics Gadget 1', price: '100' },
                        { name: 'Electronics Gadget 2', price: '150' },
                        { name: 'Electronics Gadget 3', price: '200' }
                    ]
                }
            ];

</script>
