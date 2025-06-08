<template>
  <div class="register-selection text-white position-relative">
  <div class="bg-overlay"></div>

  <div class="center-wrapper d-flex justify-content-center align-items-center text-center position-relative">
    <div class="container animate-fade-slide">
      <h1 class="mb-4 fw-bold">Daftar Sebagai</h1>
      <p class="mb-5 text-white-50" id="deskripsi">Pilih peran Anda untuk melanjutkan proses pendaftaran</p>

      <div class="row justify-content-center g-4">
        <!-- Customer -->
        <div class="col-md-4">
          <div class="card-option" @click="goTo('/register/customer')">
            <i class="bi bi-person-circle icon mb-3"></i>
            <h5 class="fw-bold">Customer</h5>
            <p class="text-white-50 small" id="deskripsi">Untuk Anda yang ingin mencari jasa tukang bangunan dan material berkualitas.</p>
          </div>
        </div>

        <!-- Tukang -->
        <div class="col-md-4">
          <div class="card-option" @click="goTo('/register/tukang')">
            <i class="bi bi-hammer icon mb-3"></i>
            <h5 class="fw-bold">Tukang</h5>
            <p class="text-white-50 small" id="deskripsi">Untuk Anda yang ingin menawarkan jasa sebagai tukang profesional.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'RegisterSelection',
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.register-selection {
  min-height: 100vh;
  font-family: 'MuseoModerno', sans-serif;
  position: relative;
  background-color: #000;
  overflow: hidden;
}

.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)),
    url('/images/register.jpg') center/cover no-repeat;
  animation: zoomBackground 30s ease-in-out infinite;
  z-index: 0;
}

.card-option {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-option:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.08);
}
.icon {
  font-size: 3rem;
  color: white;
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

@keyframes zoomBackground {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.center-wrapper {
  min-height: 100vh;
  padding: 2rem;
  z-index: 1;
}

#deskripsi {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-style: normal;
}

</style>
