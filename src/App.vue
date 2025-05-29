<template>
  <div id="app">
    <!-- Semua halaman ditampilkan via router-view -->
    <router-view @login-success="handleLoginSuccess" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      loggedIn: false
    };
  },
  methods: {
    handleLoginSuccess() {
      this.loggedIn = true;
      this.$router.push('/materials');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  min-height: 100vh;
}
</style>
