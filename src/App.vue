<template>
    <Header />
    <Login />
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

