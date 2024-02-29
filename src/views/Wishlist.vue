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

                    <!-- <td class="flex justify-center p-0.5 items-center w-1/2" v-for = "(item, index) in item_list" :key="index" > -->
                    <!--     <input class="border bg-transparent w-full" :placeholder="item" @change="changeListItem"></input> -->
                    <!--     <button class="bg-red-400 w-6"@click="removeItem(index)">-</button> -->
                    <!-- </td> -->
    <!---->
    <!--     <div class="flex justfiy-center p-0.5 items-center w-1/2 mt-4"> -->
    <!--         <input class="border bg-transparent w-full" v-model="new_item" @keyup.enter="addItem" :placeholder="item"></input> -->
    <!--         <button class="bg-green-400 w-6" @click="addItem" >+</button> -->
    <!--     </div> -->
    </div> 

</template>

<script>
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
        created(){
            this.item_list.push(this.test);
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
