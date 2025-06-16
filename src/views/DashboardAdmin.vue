<template>
  <button @click="logout" class="logout-button">Logout</button>
  <div class="admin-dashboard-wrapper">
    <div class="dashboard-content">
      <h1 class="dashboard-title">Dashboard Admin  Tukang.In</h1>
      <p class="dashboard-subtitle">Selamat Datang!</p>
      <p class="dashboard-subtext">Kelola data material Anda dengan mudah</p>

      <div class="dashboard-grid">
        <router-link to="/materials/add" class="dashboard-card">
          <div class="icon">➕</div>
          <span>Tambah Material</span>
        </router-link>

        <router-link to="/materials/edit" class="dashboard-card">
          <div class="icon">✏️</div>
          <span>Edit Material</span>
        </router-link>

        <router-link to="/customers" class="dashboard-card">
          <div class="icon">📋</div>
          <span>Daftar Customer</span>
        </router-link>

        <router-link to="/tukang" class="dashboard-card">
          <div class="icon">📋</div>
          <span>Daftar Tukang</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    async logout() {
      try {
        const response = await fetch('http://localhost:8080/auth/logout', {
          method: 'POST',
          credentials: 'include', // jika backend pakai cookie/session
        });

        if (!response.ok) {
          throw new Error('Gagal logout');
        }

        // Redirect ke login
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
        alert('Terjadi kesalahan saat logout.');
      }
    }
  }
};
</script>

<style scoped>
.admin-dashboard-wrapper {
  min-height: 100vh;
  background: url('/images/Nordwood.jpg') no-repeat center center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
}

.dashboard-content {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 600px;
  width: 1000%;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.dashboard-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.dashboard-subtitle {
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  opacity: 0.95;
}

.dashboard-subtext {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  justify-content: center;
}

.dashboard-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 1.5rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, background 0.3s ease;
  text-decoration: none;
}

.dashboard-card:hover {
  transform: translateY(-6px);
  background: rgba(255, 255, 255, 0.2);
}

.icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.dashboard-card span {
  font-weight: 600;
  font-size: 1rem;
}

.logout-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background-color: rgba(255, 255, 255, 0.4);
  color: black;
}
</style>    