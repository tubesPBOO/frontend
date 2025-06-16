<template>
  <div class="edit-profile-page bg-light min-vh-100 py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-sm border-0 rounded-4 p-4 bg-white text-dark">
            <h3 class="fw-bold mb-4 text-center">Edit Profil</h3>

            <!-- Success/Error Message -->
            <div v-if="message" :class="['alert', messageType === 'success' ? 'alert-success' : 'alert-danger']">
              {{ message }}
            </div>

            <!-- Loading -->
            <div v-if="isLoading" class="text-center my-4">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Memuat...</span>
              </div>
            </div>

            <!-- Profile Form -->
            <form @submit.prevent="updateProfile" novalidate>
              <div class="mb-3">
                <label for="name" class="form-label">Nama Lengkap</label>
                <input v-model="form.name" type="text" id="name" class="form-control rounded-pill" placeholder="Masukkan nama lengkap" required />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" id="email" class="form-control rounded-pill" placeholder="Masukkan email baru" pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"/>
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label">Nomor Telepon</label>
                <input v-model="form.phoneNumber" type="tel" id="phone" class="form-control rounded-pill" placeholder="Masukkan nomor telepon" />
              </div>

              <div class="mb-3 position-relative">
                <label for="password" class="form-label">Kata Sandi Baru</label>
                <input
                  :type="isPasswordVisible ? 'text' : 'password'"
                  v-model="form.password"
                  id="password"
                  class="form-control rounded-pill"
                  placeholder="Biarkan kosong jika tidak diubah"
                />
                <span @click="togglePasswordVisibility" class="position-absolute top-50 end-0 translate-middle pe-3 cursor-pointer">
                  <i :class="isPasswordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
              </div>

              <div class="d-grid gap-2 mt-4">
                <button type="submit" class="btn btn-success rounded-pill" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                  Simpan Perubahan
                </button>
                <button @click="$router.back()" type="button" class="btn btn-outline-secondary rounded-pill">
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div
      v-if="toast.show"
      class="toast-notification"
      :class="{ success: toast.type === 'success', error: toast.type === 'error' }"
      @animationend="hideToast"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditTukangProfile',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
      },
      isLoading: true,
      isPasswordVisible: false,
      message: '',
      messageType: '',
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  mounted() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      try {
        const response = await fetch('http://localhost:8080/api/tukang/getCurrentUser', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Gagal memuat profil');

        const data = await response.json();

        this.form.name = data.name;
        this.form.email = data.email;
        this.form.phoneNumber = data.phoneNumber || '';
      } catch (err) {
        console.error('Failed to load profile:', err);
        this.message = 'Gagal memuat profil. Silakan login ulang.';
        this.messageType = 'error';
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } finally {
        this.isLoading = false;
      }
    },

    async updateProfile() {
      this.isLoading = true;
      try {
        const payload = { ...this.form };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.form.email && !emailRegex.test(this.form.email)) {
        this.showToast('error', 'Format email tidak valid.');
        this.isLoading = false;
        return;
      }

        if (!payload.password) delete payload.password;

        const response = await fetch('http://localhost:8080/api/tukang/UpdateProfile', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          credentials: 'include'
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(errorMsg || 'Gagal memperbarui profil.');
        }

        this.showToast('success', 'Profil berhasil diperbarui.', 'success');
        setTimeout(() => {
          this.$router.back(); 
        }, 1500);

      } catch (err) {
        console.error('Update failed:', err);
        this.showToast('error', err.message || 'Gagal memperbarui profil.', 'error');
      } finally {
        this.isLoading = false;
      }
    },

    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },

    showToast(type, message) {
      this.toast = {
        show: true,
        message,
        type
      };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
    hideToast() {
      this.toast.show = false;
    }
  }
};
</script>

<style scoped>
.edit-profile-page {
  font-family: 'Poppins', sans-serif;
}

.card {
  backdrop-filter: blur(10px);
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.toast-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  z-index: 1050;
  opacity: 1;
  animation: slideIn 0.3s ease, fadeOut 3s ease forwards;
}
.toast-notification.success {
  background: #16a34a;
}
.toast-notification.error {
  background: #ef4444;
}

@keyframes slideIn {
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes fadeOut {
  0%, 90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>