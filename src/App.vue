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
