<template>

    <div class="flex items-center justify-center min-h-screen font-bold">
        <div class= "border-container">
            <div class="flex justify-center py-10">
                <h1 class="text-5xl">Login</h1>
            </div>
            <div class="flex flex-col py-3 space-y-10"> <input class="input" id="username" placeholder="username" v-model="username" required/>
                <input class="input" id="password" placeholder="password" type="password" v-model="password" required/>
            </div>
            <span class="flex justify-center py-10 space-x-10">
                <button type="submit" class="button" @click="login">Login</button>
            </span>
        </div>
    </div>
</template>

<script>
import AuthentificationService from '@/services/AuthentificationService';

    export default {
        data() {
            return {
                username: '',
                password: '',
            };
        },
        methods: {
            async login() {
                try{
                    const res = await AuthentificationService.login({
                        username: this.username,
                        password: this.password,
                    });
                    if(res.data.success){
                        this.$router.push('/about');
                    }
                }
                catch(err){
                }
            },
        },
    };
</script>

<style scoped>
.button{

    @apply hover:text-purple-400;
}
.input{
    @apply rounded-md bg-gray-600 pl-4;
}
.border-container{
    @apply rounded-lg border-2 p-10 space-y-4 text-2xl;
}
</style>
