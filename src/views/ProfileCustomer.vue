<template>
  <div class="profile-page bg-light min-vh-100 py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card shadow-sm border-0 rounded-4 p-4 bg-white text-dark position-relative">
            <!-- Avatar -->
            <div class="text-center mb-4">
              <i class="bi bi-person-circle display-1 text-success"></i>
              <h3 class="mt-2 fw-bold">{{ customer.name }}</h3>
              <p class="text-muted">Pelanggan</p>
            </div>

            <!-- Loading Spinner -->
            <div v-if="isLoading" class="text-center my-4">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Memuat...</span>
              </div>
            </div>

            <!-- Profile Info -->
            <div v-if="!isLoading" class="profile-info mb-4">
              <p><strong>Email:</strong> {{ customer.email }}</p>
              <p><strong>Nomor Telepon:</strong> {{ customer.phoneNumber || 'N/A' }}</p>
              <p><strong>Alamat:</strong> {{ customer.alamat || 'N/A' }}</p>
            </div>

            <!-- Action Buttons -->
            <div v-if="!isLoading" class="d-grid gap-3 mt-4">
              <button @click="goToEdit" class="btn btn-outline-success rounded-pill">
                <i class="bi bi-pencil-square me-2"></i>Edit Profil
              </button>

              <button @click="confirmDeleteAccount" class="btn btn-outline-danger rounded-pill">
                <i class="bi bi-trash me-2"></i>Hapus Akun
              </button>

              <button @click="logout" class="btn btn-secondary rounded-pill">
                <i class="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="toast.show" class="toast-notification"
      :class="{ success: toast.type === 'success', error: toast.type === 'error' }" @animationend="hideToast">
      {{ toast.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCustomer",
  data() {
    return {
      customer: {
        name: "Memuat...",
        email: "",
        phoneNumber: "",
        alamat: "",
        availability: true,
        totrating: 0,
        ratingCount: 0,
      },
      isLoading: false, // To track loading state
      toast: {
        show: false,
        message: "",
        type: "success",
      },
    };
  },
  mounted() {
    this.loadProfile(); // Load profile data on mount
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loadProfile();
    });
  },
  watch: {
  '$route.query.updated': {
    immediate: true,
    handler() {
      this.loadProfile();
    }
  }
},
  methods: {
    async loadProfile() {
      this.isLoading = true; // Show loading indicator
      try {
        const response = await fetch("http://localhost:8080/api/customers/getCurrentUser", {
          method: "GET",
          credentials: "include",
        });
        console.log("Profil customer dimuat ulang");
        if (!response.ok) throw new Error("Gagal memuat profil");

        const data = await response.json();

        this.customer = {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          alamat: data.address,
        };
      } catch (err) {
        console.error("Failed to load profile:", err);
        this.showToast("error", "Gagal memuat profil. Silakan login ulang.");
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } finally {
        this.isLoading = false; // Hide loading indicator
      }
    },

    async confirmDeleteAccount() {
      const confirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus akun? Aksi ini tidak dapat dibatalkan."
      );
      if (!confirmed) return;

      try {
        const res = await fetch("http://localhost:8080/api/customers/deleteAccount", {
          method: "DELETE",
          credentials: "include",
        });

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Gagal menghapus akun");
        }

        this.showToast("success", "Akun berhasil dihapus.");
        localStorage.removeItem("cart");
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (err) {
        console.error("Delete failed:", err);
        this.showToast("error", err.message || "Gagal menghapus akun.");
      }
    },

    async logout() {
      try {
        await fetch("http://localhost:8080/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        console.warn("Logout endpoint failed:", err);
      } finally {
        localStorage.removeItem("cart");
        this.showToast("success", "Berhasil logout.");
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      }
    },

    goToEdit() {
      this.$router.push("/customer/edit-profile").then(() => {
        this.loadProfile(); // Reload profile data after returning from edit
      });
    },

    showToast(type, message) {
      this.toast = {
        show: true,
        message,
        type,
      };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
    hideToast() {
      this.toast.show = false;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.profile-page {
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

.profile-info p {
  margin-bottom: 0.75rem;
}

.badge {
  font-size: 0.85rem;
  padding: 0.4em 0.6em;
}

/* Toast Notification */
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

  0%,
  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>