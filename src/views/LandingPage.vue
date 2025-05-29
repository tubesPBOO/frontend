<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">TU<br />KANG<br />IN</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link active" href="#">Beranda</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Tentang</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Lokasi</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Galeri Kami</a></li>
          </ul>
          <button class="btn btn-danger ms-3 fw-bold">Daftar Menu</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="d-flex align-items-center justify-content-center text-center" style="height: 100vh; background: url('https://source.unsplash.com/1600x900/?shoes,clean') no-repeat center center; background-size: cover;">
      <div class="container mt-5 pt-5">
        <h1 class="display-5 fw-bold text-dark">Solusi Terpercaya Untuk Rumah Impian Anda</h1>
        <p class="lead mt-3 text-dark">
          Kami memberikan layanan terbaik untuk transaksi material. Bekerja secara profesional,
          menggunakan tukang dengan keturunan JAWA.
        </p>
        <button @click="goToLogin" class="btn btn-danger btn-lg mt-3 fw-bold shadow-sm">
          Login
        </button>
      </div>
    </section>
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
section {
  min-height: 100vh;
}
.navbar-brand {
  line-height: 1.1;
  font-size: 18px;
}
</style>
