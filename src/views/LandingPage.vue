<template>
  <div class="landing-page text-black">
    <!-- Header -->
    <header class="d-flex justify-content-between align-items-center px-4 py-3">
      <div class="d-flex align-items-center">
        <img src="../assets/home-dot.svg" alt="Home" height="30" class="me-2" />
        <span class="fw-bold text-white">GROUP 4</span>
      </div>
      <div>
        <img src="../assets/arrow-down-left.svg" alt="Arrow" height="40" />
      </div>
    </header>

    <!-- Logo + Login -->
    <section class="d-flex justify-content-center align-items-center text-center flex-column" style="height: 70vh;">
      <h1 class="logo-box fw-bold">Tukang.In</h1>
      <button @click="goToLogin" class="btn btn-outline-light mt-4 px-5 py-2 fw-bold">
        Login
      </button>
    </section>

    <!-- Footer keywords -->
    <footer class="d-flex justify-content-between px-5 pb-4 small fw-bold text-uppercase">
      <span>Material</span>
      <span>-</span>
      <span>Tukang Profesional</span>
      <span>-</span>
      <span>Trustworthy</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    goToLogin() {
      this.$router.push('/login'); // nanti pastikan route /login tersedia
    }
  }
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background-color: #2d2d2d;
  font-family: 'MuseoModerno';
}

.logo-box {
  font-size: 3rem;
  color: white;
}

footer span {
  color: white;
}
</style>
