<template>
  <div class="login-page">
    <div class="login-overlay">
      <div class="login-container d-flex">
        <!-- Left Side with Branding -->
        <div class="login-left text-white d-flex flex-column justify-content-end p-5">
          <div>
            <h2 class="fw-bold mb-3">Selamat Datang di Tukang.In!</h2>
            <p class="mb-4">
              Solusi cepat dan mudah untuk menemukan tukang terpercaya. Masuk untuk mengelola pesanan dan permintaan jasa Anda.
            </p>
          </div>
        </div>

        <!-- Right Side Form -->
        <div class="login-right p-5">
          <h3 class="mb-4 text-white fw-semibold">Masuk ke Akun Anda</h3>

          <form @submit.prevent="login">
            <div class="form-group mb-4">
              <input type="text" class="custom-input" placeholder="Nama Pengguna" v-model="username" required />
            </div>

            <div class="form-group mb-2 position-relative">
              <input :type="showPassword ? 'text' : 'password'" class="custom-input" placeholder="Kata Sandi"
                v-model="password" required minlength="8" />
              <span class="toggle-password" @click="togglePassword">
                <i :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </span>
            </div>

            <button type="submit" class="btn btn-light w-100 rounded-pill my-4">Masuk</button>

            <div class="text-center">
              <span class="text-white">Belum punya akun? <a href="#" class="text-decoration-underline">Daftar di sini</a></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    login() {
      // Simulasikan login
      alert(`Berhasil login sebagai ${this.username}`);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.login-page {
  background: url('/images/bg-mount-fix.jpg') center/cover no-repeat;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.login-overlay {
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.3);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  width: 100%;
  max-width: 1200px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.login-left {
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.login-right {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.custom-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  width: 100%;
  padding: 0.5rem 0;
  outline: none;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.custom-input:focus {
  border-color: #fff;
  box-shadow: none;
}

.toggle-password {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ccc;
}
</style>
