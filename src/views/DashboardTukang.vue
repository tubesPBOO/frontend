<template>
  <div class="dashboard-page text-dark">
    <!-- Navbar -->
    <header class="navbar d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm border-bottom border-gray-200">
      <div class="logo-text fw-bold fs-4" style="font-family: 'MuseoModerno', sans-serif;">Tukang.In</div>

      <!-- Mobile Menu Toggle -->
      <button
        class="btn btn-outline-dark d-md-none"
        @click="toggleMobileMenu"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list"></i>
      </button>

      <!-- Desktop Navigation -->
      <nav class="d-none d-md-flex align-items-center gap-3">
        <button class="btn btn-outline-dark rounded-pill px-3 d-flex align-items-center" @click="goToProfile">
          <i class="bi bi-person-circle me-2"></i> {{ username }}
        </button>
      </nav>
    </header>

    <!-- Mobile Navigation Drawer -->
    <nav v-if="isMobileMenuOpen" class="mobile-menu bg-white p-3 shadow-lg d-md-none">
      <button class="btn btn-outline-dark w-100 rounded-pill mb-2" @click="goToProfile">
        <i class="bi bi-person-circle me-2"></i> Profil Saya
      </button>
    </nav>

    <!-- Content -->
    <section class="container py-5">
      <h2 class="mb-4 fw-bold section-heading">Proyek Tersedia</h2>

      <!-- Status Message -->
      <div v-if="joinedProject" class="alert alert-success mb-4 shadow-sm">
        <strong>Kamu sedang bergabung proyek:</strong> {{ joinedProject.title }}
      </div>

      <!-- Filter by Location -->
      <div class="mb-4">
        <label for="locationFilter" class="form-label">Cari berdasarkan lokasi:</label>
        <select id="locationFilter" v-model="selectedLocation" class="form-select rounded-pill px-3 py-2" style="max-width: 300px;">
          <option value="">Semua Lokasi</option>
          <option v-for="location in uniqueLocations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="row">
        <div v-for="n in 3" :key="n" class="col-md-6 col-lg-4 mb-4">
          <div class="skeleton-card rounded p-4"></div>
        </div>
      </div>

      <!-- Projects Grid -->
      <div v-else class="row g-4">
        <div v-for="project in filteredProjects" :key="project.id" class="col-md-6 col-lg-4">
          <div class="project-card card-bg h-100 position-relative overflow-hidden rounded shadow-sm">
            <div class="p-4">
              <h4 class="fw-semibold mb-2">{{ project.title }}</h4>
              <p class="text-muted mb-2 clamp-text">{{ project.description }}</p>
              <p class="small text-secondary mb-1"><i class="bi bi-geo-alt me-1"></i> {{ project.location }}</p>

              <!-- Join Button with Disabled State -->
              <button
                class="btn btn-join mt-3 w-100 rounded-pill"
                @click="handleJoin(project)"
                :disabled="!!joinedProject"
              >
                {{ joinedProject ? 'Sudah Bergabung' : 'Gabung Proyek' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Projects -->
      <div v-if="!filteredProjects.length && !isLoading" class="text-center mt-5 text-muted">
        <img src="https://picsum.photos/id/19/300/200"  alt="No projects illustration" class="img-fluid mb-3 rounded shadow-sm" style="max-width: 200px;" />
        <p class="fs-5">Belum ada proyek tersedia untuk lokasi ini.</p>
        <button class="btn btn-outline-dark mt-2 rounded-pill" @click="selectedLocation = ''">Lihat Semua Lokasi</button>
      </div>

      <!-- Join Confirmation Modal -->
      <div class="modal fade" id="joinModal" tabindex="-1" aria-labelledby="joinModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-white text-dark rounded shadow-lg">
            <div class="modal-header border-0">
              <h5 class="modal-title fw-bold" id="joinModalLabel">Konfirmasi Bergabung</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>Nama Proyek:</strong> {{ selectedProject?.title }}</p>
              <p><strong>Lokasi:</strong> {{ selectedProject?.location }}</p>
              <p><strong>Deskripsi:</strong> {{ selectedProject?.description }}</p>
              <p class="text-muted small">Anda hanya bisa bergabung dengan satu proyek.</p>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-outline-secondary rounded-pill px-4" data-bs-dismiss="modal">Batal</button>
              <button type="button" class="btn btn-success rounded-pill px-4" @click="confirmJoin">Gabung Proyek</button>
            </div>
          </div>
        </div>
      </div>

    </section>

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
  name: 'TukangDashboard',
  data() {
    return {
      username: 'Memuat...', 
      isLoading: true,
      projects: [],
      joinedProject: null,
      selectedLocation: '',
      isMobileMenuOpen: false,
      toast: {
        show: false,
        message: '',
        type: 'success'
      },
      selectedProject: null
    };
  },
  computed: {
    uniqueLocations() {
      const locations = new Set();
      this.projects.forEach(p => locations.add(p.location));
      return Array.from(locations);
    },
    filteredProjects() {
      if (!this.selectedLocation) return this.projects;
      return this.projects.filter(p => p.location === this.selectedLocation);
    }
  },
  mounted() {
    this.loadCurrentUser(); 
    this.fetchProjects();
    this.loadJoinedProject();
  },
  methods: {
    async loadCurrentUser() {
      try {
        const response = await fetch('http://localhost:8080/api/tukang/getCurrentUser', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Gagal memuat akun pengguna');
        }

        const tukang = await response.json();
        this.username = tukang.name; 
      } catch (error) {
        console.error('Failed to load current user:', error);
        this.showToast('error', 'Silakan login ulang.');
        setTimeout(() => {
          this.$router.push('/login'); 
        }, 1500);
      }
    },

    async fetchProjects() {
  this.isLoading = true;
  try {
    const response = await fetch('http://localhost:8080/api/tukang/getAllProjects', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Gagal memuat proyek');

    const data = await response.json();

    // Map and filter projects
    this.projects = data
      .filter(p => p.status === 'Looking for Tukang')
      .filter(p => p.listTukang?.length < p.jumTukang)
      .map(p => ({
        id: p.id,
        title: p.name,
        description: p.deskripsi || 'Deskripsi tidak tersedia.',
        location: p.alamatKota || 'Lokasi tidak tersedia.',
        customerName: p.customerId || 'Customer Tidak Diketahui',
        duration: p.durasi,
        price: p.price,
        tukangCount: p.jumTukang,
        currentTukang: p.listTukang?.length || 0,
        status: p.status
      }));

  } catch (error) {
    console.error('Error fetching projects:', error);
    this.showToast('error', 'Gagal memuat proyek dari server.');
  } finally {
    this.isLoading = false;
  }
},

    async loadJoinedProject() {
      try {
        const response = await fetch('http://localhost:8080/api/tukang/getMyProject', {
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) return;

        const data = await response.json();
        if (data && data.length > 0) {
          const project = data[0];
          this.joinedProject = {
            id: project.id,
            title: project.name,
            description: project.deskripsi,
            location: project.alamatKota
          };
        }
      } catch (err) {
        console.error('Failed to load joined project:', err);
      }
    },

    handleJoin(project) {
      if (this.joinedProject) {
        this.showToast('error', 'Anda hanya bisa bergabung satu proyek.');
        return;
      }

      this.selectedProject = project;

      const modalEl = document.getElementById('joinModal');
      if (!modalEl) {
        console.error("Modal element not found!");
        this.showToast('error', "Gagal menampilkan konfirmasi.");
        return;
      }

      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    },

    async confirmJoin() {
      if (!this.selectedProject) return;

      try {
        const response = await fetch('http://localhost:8080/api/tukang/assignSelf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.selectedProject.title }),
          credentials: 'include'
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(errorMsg || 'Gagal bergabung ke proyek');
        }

        this.joinedProject = { ...this.selectedProject };
        localStorage.setItem('joinedProject', JSON.stringify(this.joinedProject));
        this.showToast('success', `Berhasil bergabung ke proyek: ${this.selectedProject.title}`);

      } catch (error) {
        console.error('Join failed:', error);
        this.showToast('error', error.message || 'Gagal bergabung ke proyek.');
      } finally {
        this.selectedProject = null;
        const modal = bootstrap.Modal.getInstance(document.getElementById('joinModal'));
        if (modal) modal.hide();
      }
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    goToProfile() {
      this.$router.push('/Profile/Tukang');
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
@import url('https://fonts.googleapis.com/css2?family=MuseoModerno:wght@500;700&family=Poppins&display=swap');

.dashboard-page {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  background-color: #f8f9fa; 
  color: #1a1a1a;
}

.card-bg {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-bg:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.btn-join {
  background: linear-gradient(to right, #4ADE80, #22C55E);
  color: #fff;
  font-weight: 600;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-join:hover {
  transform: scale(1.02);
  box-shadow: 0 0 12px rgba(74, 222, 128, 0.4);
}
.btn-join:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.section-heading {
  font-size: 1.6rem;
  border-left: 4px solid #4ADE80;
  padding-left: 0.75rem;
}

.skeleton-card {
  height: 200px;
  background: #e9ecef;
  animation: pulse 1.5s infinite ease-in-out;
  border-radius: 1rem;
}

@keyframes pulse {
  0% { opacity: 0.8; }
  50% { opacity: 0.4; }
  100% { opacity: 0.8; }
}

.clamp-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  0%, 90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>