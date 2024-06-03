<template>
    <v-container>
        <v-row
            justify = "center"
        >
            <v-col
                cols="10"
            > 
                <ItemList />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
    import ItemList from './wishlist/ItemList.vue';
</script>
