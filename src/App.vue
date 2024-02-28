<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './components/general_purpose/Header.vue';
    import Login from './views/Login.vue';


    export default{
        components: {
            Header,
            Login, 
        },
    }
</script>

