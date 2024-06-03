<template>
    <div class="border-red-500 text-red-500">{{message}}</div>
</template>

<script setup>
    import {ref} from 'vue';
    let message = ref('');
    return{
        message
    }
</script>
