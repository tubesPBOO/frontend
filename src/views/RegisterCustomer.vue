<template>
  <div class="register-page">
    <div class="overlay d-flex justify-content-center align-items-center">
      <div class="form-container p-5">
        <button class="btn btn-sm btn-outline-light mb-4 rounded-pill" @click="goBack">
          ← Kembali
        </button>

        <h2 class="text-white mb-4 text-center fw-bold">Daftar Sebagai Customer</h2>

        <div v-if="message" :class="['alert', isError ? 'alert-danger' : 'alert-success']">
          {{ message }}
        </div>

        <transition-group name="fade" tag="form" @submit.prevent="registerCustomer">
          <div class="mb-3" key="name">
            <input
              v-model="form.name"
              type="text"
              class="form-control custom-input"
              placeholder="Nama Lengkap"
              required
            />
          </div>
          <div class="mb-3" key="email">
            <input
              v-model="form.email"
              type="email"
              class="form-control custom-input"
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-3 position-relative" key="password">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              class="form-control custom-input"
              placeholder="Kata Sandi"
              required
            />
          </div>
          <div class="mb-3" key="address">
            <input
              v-model="form.address"
              type="text"
              class="form-control custom-input"
              placeholder="Alamat"
              required
            />
          </div>
          <div class="mb-4" key="phone">
            <input
              v-model="form.phoneNumber"
              type="text"
              class="form-control custom-input"
              placeholder="Nomor Telepon"
              required
            />
          </div>
          <button
            type="submit"
            class="btn btn-light w-100 fw-semibold rounded-pill"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
            Daftar
          </button>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterCustomer',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
      },
      message: '',
      isError: false,
      showPassword: false,
      isLoading: false
    };
  },
  methods: {
    async registerCustomer() {
      this.isLoading = true;
      try {
        const res = await fetch('http://localhost:8080/api/customers/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) {
          const errText = await res.text();
          this.message = `Pendaftaran gagal: ${errText}`;
          this.isError = true;
        } else {
          this.message = 'Pendaftaran berhasil! Mengalihkan ke halaman login...';
          this.isError = false;
          setTimeout(() => this.$router.push('/login'), 2000);
        }
      } catch (err) {
        this.message = `Error: ${err.message}`;
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.register-page {
  background: url('/images/bg-mount-fix.jpg') center/cover no-repeat;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.overlay {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(4px);
  min-height: 100vh;
  padding: 2rem;
}

.form-container {
  max-width: 500px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  color: white;
}

.custom-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  color: white;
  border-radius: 0;
  outline: none;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.custom-input:focus {
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid white;
  background-color: rgba(255, 255, 255, 0.05);
}

.toggle-password-icon {
  font-size: 1.2rem;
  user-select: none;
}

button[type="submit"] {
  transition: transform 0.2s;
}
button[type="submit"]:hover:not(:disabled) {
  transform: scale(1.02);
}

.alert {
  font-size: 0.9rem;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
