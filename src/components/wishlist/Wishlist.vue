<template>
    <div>
        <h2>Wishlist</h2>
        <ul>
            <li v-for="(item, index) in wishlist" :key="index">
                {{ item }}
                <button @click="removeItem(index)">Remove</button>
            </li>
        </ul>
        <input v-model="newItem" placeholder="Add new item" />
        <button @click="addItem">Add Item</button>
    </div>
</template>

<script>
    const knex = require('../knex.cjs')
    knex.raw('SELECT * FROM users WHERE username = >', [username])
    .then((result) => {
            console.log(result[0])
        })
        .catch((err) => {
            console.error(err);
        })
    export default {
        data() {
            return {
                wishlist: [],
                newItem: '',
            };
        },
        methods: {
            addItem() {
                if (this.newItem.trim() !== '') {
                    this.wishlist.push(this.newItem.trim());
                    this.newItem = '';
                }
            },
            removeItem(index) {
                this.wishlist.splice(index, 1);
            },
        },
    };
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
