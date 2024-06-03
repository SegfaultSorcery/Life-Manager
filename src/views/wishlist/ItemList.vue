<template>
    <v-expansion-panels multiple>
        <v-expansion-panel v-for="(category, index) in categories" :key="index">
            <v-expansion-panel-title>
                <div>{{category.name}}</div>
                <v-btn 
                    icon="mdi-plus" 
                    density="compact" 
                    @click.stop="addItem" 
                    >
                    <v-icon color="accent"></v-icon>

                </v-btn>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-table>
                    <tr v-for="(items, index) in category.items">
                        <td> {{items.name}} </td>
                        <td> {{items.price}} </td>
                        <td> 
                            <v-btn 
                                icon="mdi-delete" 
                                density="compact" 
                                @click="removeItem(subIndex)"
                                >
                                <v-icon color="red"></v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </v-table>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<!-- <template> -->
<!--     <v-data-table -->
<!--         :groupBy="groupBy" -->
<!--         :headers="headers" -->
<!--         :items="categories" -->
<!--         class="w-3" -->
<!--         item-value="items" -->
<!--     > -->
<!--         <template v-slot:group-header="{item, columns, toggleGroup, isGroupOpen }"> -->
<!--             <tr> -->
<!--                 <td :colspan="columns.length"> -->
<!--                     <div class="flex items-center"> -->
<!--                         <VBtn -->
<!--                         :icon="isGroupOpen(item) ? '$expand' : '$next'" -->
<!--                         size="small" -->
<!--                         variant="text" -->
<!--                         @click="toggleGroup(item)" -->
<!--                         > -->
<!--                         </VBtn> -->
<!---->
<!--                         <div class="flex-grow">{{item.value}}</div> -->
<!--                         <div> -->
<!--                             <v-btn icon="mdi-plus" density="compact" @click="addItem" ><v-icon color="accent"></v-icon></v-btn> -->
<!---->
<!--                         </div> -->
<!--                     </div> -->
<!---->
<!--                 </td> -->
<!--             </tr> -->
<!--         </template> -->
<!---->
<!--         <template v-slot:item="{item, index}"> -->
<!--             <tr v-for="(subItem, subIndex) in item.items" :key="subIndex"> -->
<!--                 <td class="flex-1"> {{subItem.name}} </td> -->
<!--                 <td class="flex-1"> {{subItem.price}} </td> -->
<!--                 <td class="flex-1">  -->
<!--                     <v-btn icon="mdi-delete" density="compact" @click="removeItem(subIndex)"><v-icon color="red"></v-icon></v-btn> -->
<!---->
<!--                 </td> -->
<!--             </tr> -->
<!--         </template> -->
<!--     </v-data-table> -->
<!-- </template> -->

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
                        { name: 'Book 1', price: '$10' },
                        { name: 'Book 2', price: '$15' },
                        { name: 'Book 3', price: '$20' }
                    ]
                },
                {
                    name: 'Electronics',
                    items: [
                        { name: 'Gadget 1', price: '$100' },
                        { name: 'Gadget 2', price: '$150' },
                        { name: 'Gadget 3', price: '$200' }
                    ]
                }
            ];

</script>
