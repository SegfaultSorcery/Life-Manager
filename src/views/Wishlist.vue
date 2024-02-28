<template>
    <div class="wishlist-container">
        <li class="wishlist" v-for = "(item, index) in item_list" :key="index" >
            <spane class="list_item">{{ item }}
            <button class="add-button"@click="removeItem(index)">-</button>
            </spane>
        </li>
    </div> 

    <div>
        <input class="list_item" type="text" v-model="new_item" placeholder="Add new item">
        <button @click="addItem">+</button>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                item_list:  ["item1", "item2"],
                new_item: '',
            }
        },
        methods: {
            addItem(){
                if(this.new_item.trim() !== ''){
                    this.item_list.push(this.new_item.trim());
                    this.new_item = '';
                }
            },
            removeItem(index){
                this.item_list.splice(index);
            }
        }
    }


</script>

<style scoped>
    .wishlist{@apply flex justify-center;}

    .list_item{@apply flex flex-row bg-transparent border border-2;}
    .add-button{@apply bg-red-400 w-6;}
</style>
