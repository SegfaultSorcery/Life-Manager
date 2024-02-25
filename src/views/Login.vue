<template>

    <div class="myContainer flex items-center justify-center min-h-screen font-bold">
        <form action="submit" method="post">
            <div class= "border-container">
                <div class="flex justify-center py-10">
                    <h1 class="text-5xl">Login</h1>
                </div>
                <div class="flex flex-col py-3 space-y-4">
                    <label for="username">Username</label>
                    <input class="input" id="username" v-model="username" required/>
                    <label for="password">Password</label>
                    <input class="input" id="password" type="password" v-model="password" required/>
                </div>
                <span class="flex justify-center py-10 space-x-10">
                    <button class="button"@click="register">Register</button>
                    <button type="submit" class="button" @click="login">Login</button>
                </span>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
            };
        },
        methods: {
            login() {
                console.log('Username:', this.username);
                console.log('Password:', this.password);
                // Add your login logic here
            },
        },
    };
</script>

<style scoped>
.button{
    @apply hover:text-purple-400;
}
.input{
    @apply rounded-md bg-gray-600;
}
.border-container{
    @apply rounded-lg border-2 p-10 space-y-4 text-2xl;
}
</style>
