<template>
    <v-app>
        <!-- <Navbar /> -->
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script setup>
    import Navbar from './views/Navbar.vue'
</script>
