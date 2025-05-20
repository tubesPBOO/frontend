<template>
  <div id="app">
    <!-- Conditionally render Login or MaterialsList based on login status -->
    <Login v-if="!loggedIn" @login-success="handleLoginSuccess" />
    <MaterialsList v-if="loggedIn" />
  </div>
</template>

<script>
// Import the MaterialsList and Login components
import MaterialsList from './api/MaterialList.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    MaterialsList,
    Login,
  },
  data() {
    return {
      loggedIn: false, // Track if the user is logged in
    };
  },
  methods: {
    // Handle login success from Login component
    handleLoginSuccess() {
      this.loggedIn = true; // Mark the user as logged in
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
