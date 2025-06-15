<template>
  <div class="login-page">
    <div class="login-overlay">
      <div class="login-container d-flex shadow-lg">
        <!-- Left Side with Branding -->
        <div class="login-left d-flex flex-column justify-content-between text-white p-5">
          <div class="logo-area mb-4 animate-fade-in">
            <h2 class="fw-bold">Tukang.In</h2>
          </div>
          <div class="animate-slide-up">
            <h3 class="fw-bold mb-3">Selamat Datang!</h3>
            <p class="mb-4 text-white-50">
              Solusi cepat dan mudah untuk menemukan tukang terpercaya. Masuk untuk mengelola pesanan dan permintaan jasa Anda.
            </p>
            <span class="badge bg-light text-dark px-3 py-2 rounded-pill animate-bounce">#SolusiBangunan</span>
          </div>
        </div>

        <!-- Right Side Form -->
        <div class="login-right p-5 d-flex flex-column justify-content-center">
          <h3 class="mb-4 text-white fw-semibold animate-fade-in">Masuk ke Akun Anda</h3>

          <form @submit.prevent="login">
            <div class="form-group mb-4">
              <input
                type="text"
                class="custom-input"
                placeholder="Nama Pengguna"
                v-model="username"
                required
              />
            </div>

            <div class="form-group mb-2 position-relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="custom-input"
                placeholder="Kata Sandi"
                v-model="password"
                required
                minlength="8"
              />
              <span class="toggle-password" @click="togglePassword">
                <i :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </span>
            </div>

            <button type="submit" class="btn btn-light w-100 rounded-pill my-4 animate-button-hover">
              Masuk
            </button>

            <div class="text-center">
              <span class="text-white">
                Belum punya akun?
                <router-link to="/register" class="text-decoration-underline">Daftar di sini</router-link>
              </span>
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
    async login() {
      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.username,
            pass: this.password
          }),
          credentials: 'include' 
        });

        if (!response.ok) {
          const errText = await response.text();
          this.message = `Login gagal: ${errText}`;
        }

        const message = await response.text(); 

        let redirectPath = '/Dashboard/Admin';

        if (message.includes('Admin')) {
          localStorage.setItem('role', 'admin');
        } else if (message.includes('Customer')) {
          localStorage.setItem('role', 'customer');
          redirectPath = '/HomePage';
        } else if (message.includes('Tukang')) {
          localStorage.setItem('role', 'tukang');
          redirectPath = '/Dashboard/Tukang';
        }

        this.$router.push(redirectPath);
      } catch (err) {
        console.error('Login failed:', err);
        this.error = 'Login gagal. Periksa kredensial Anda.';
      }
    }
  }
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
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
  backdrop-filter: blur(3px);
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
}

.login-left {
  flex: 1;
  background: rgba(0, 0, 0, 0.6);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.login-right {
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.logo-area h2 {
  font-family: 'MuseoModerno', sans-serif;
  font-size: 2rem;
}

.custom-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  width: 100%;
  padding: 0.6rem 0;
  transition: border-color 0.3s;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.custom-input:focus {
  border-color: #f8f9fa;
  box-shadow: none;
  outline: none;
}

.toggle-password {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ccc;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
.animate-slide-up {
  animation: slideUp 1s ease-out;
}
.animate-bounce {
  animation: bounce 2s infinite;
}
.animate-button-hover {
  transition: all 0.2s ease;
}
.animate-button-hover:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideUp {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
