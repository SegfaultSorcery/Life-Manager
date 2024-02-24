<template>
  <div id="login-container">
    <h2>Log In</h2>
    <label for="username">Username</label>
    <input id="username" v-model="username" />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <button @click="login">Login</button>
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

</style>

