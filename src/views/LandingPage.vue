<template>
  <div class="landing-page text-white position-relative">
    <!-- Background -->
    <div class="bg-overlay"></div>

    <!-- Header -->
    <header class="d-flex justify-content-between align-items-center px-4 py-3 position-relative animate-fade-slide">
      <div class="d-flex align-items-center">
        <img src="/images/home-dot.svg" alt="Home" height="30" class="me-2" />
        <span class="fw-bold" id="deskripsi">GROUP 4</span>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button @click="goToLogin" class="btn btn-outline-light fw-bold px-3 py-1 animate-bounce-hover">
          <i class="bi bi-box-arrow-in-right me-2"></i> Login
        </button>
        <button @click="goToRegister" class="btn btn-light fw-bold text-dark px-3 py-1 animate-bounce-hover">
          <i class="bi bi-person-plus-fill me-2"></i> Register
        </button>
      </div>
    </header>

    <!-- Hero -->
    <section class="d-flex justify-content-center align-items-center text-center flex-column position-relative" style="height: 70vh;">
      <h1 class="logo-box fw-bold animate-fade-slide delay-1">Tukang.In</h1>
      <p class="tagline mt-2 text-white-50 typing-text">{{ typedText }}</p>
    </section>

    <!-- About Us -->
    <section class="about-us text-center py-5 position-relative animate-fade-slide delay-2">
      <div class="container">
        <h2 class="mb-3 fw-bold">Tentang Tukang.In</h2>
        <p class="lead text-white-50" id="deskripsi">
          Tukang.In adalah solusi digital untuk mencari tukang bangunan profesional dan membeli material bangunan secara online dengan mudah, cepat, dan aman.
        </p>
      </div>
    </section>

    <!-- Services -->
    <section class="services py-5 position-relative animate-fade-slide delay-3">
      <div class="container text-center">
        <h2 class="fw-bold mb-4">Layanan Kami</h2>
        <div class="row">
          <div class="col-md-3 mb-4">
            <i class="bi bi-tools fs-1 text-light mb-2"></i>
            <h5 class="fw-bold" id="deskripsi">Cari Tukang</h5>
            <p class="text-white-50" id="deskripsi">Temukan tukang berpengalaman dan terpercaya.</p>
          </div>
          <div class="col-md-3 mb-4">
            <i class="bi bi-bag-check-fill fs-1 text-light mb-2"></i>
            <h5 class="fw-bold" id="deskripsi">Beli Material</h5>
            <p class="text-white-50" id="deskripsi">Pesan material bangunan dengan harga transparan.</p>
          </div>
          <div class="col-md-3 mb-4">
            <i class="bi bi-truck fs-1 text-light mb-2"></i>
            <h5 class="fw-bold" id="deskripsi">Pengiriman Cepat</h5>
            <p class="text-white-50" id="deskripsi">Material dikirim langsung ke lokasi proyek Anda.</p>
          </div>
          <div class="col-md-3 mb-4">
            <i class="bi bi-headset fs-1 text-light mb-2"></i>
            <h5 class="fw-bold" id="deskripsi">Layanan 24/7</h5>
            <p class="text-white-50" id="deskripsi">Bantuan teknis kapan saja Anda butuh.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="d-flex justify-content-between px-5 pb-4 small fw-bold text-uppercase position-relative animate-fade-slide delay-4">
      <span id="deskripsi">Material</span>
      <span>-</span>
      <span id="deskripsi">Tukang Profesional</span>
      <span >-</span>
      <span id="deskripsi">Trustworthy</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      fullText: 'Solusi mudah cari tukang dan material bangunan',
      typedText: '',
      currentCharIndex: 0,
    };
  },
  mounted() {
    this.typeEffect();
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    typeEffect() {
      const interval = setInterval(() => {
        if (this.currentCharIndex < this.fullText.length) {
          this.typedText += this.fullText[this.currentCharIndex];
          this.currentCharIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    },
  },
};
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  font-family: 'MuseoModerno', sans-serif;
  overflow: hidden;
  position: relative;
  background-color: #000;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('/images/construction.jpg') center/cover no-repeat;
  z-index: 0;
  animation: zoomBackground 30s ease-in-out infinite;
}

.animate-fade-slide {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeSlideIn 1s forwards ease-out;
}
@keyframes fadeSlideIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.delay-1 { animation-delay: 0.3s; }
.delay-2 { animation-delay: 0.6s; }
.delay-3 { animation-delay: 0.9s; }
.delay-4 { animation-delay: 1.2s; }

@keyframes zoomBackground {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.logo-box {
  font-size: 3.5rem;
  color: white;
}

.tagline {
  font-size: 1.1rem;
  max-width: 80%;
}

.typing-text::after {
  content: '|';
  animation: blink 1s infinite;
  margin-left: 4px;
  color: white;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

footer span {
  color: white;
}

.animate-bounce-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.animate-bounce-hover:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

#deskripsi {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}
</style>
