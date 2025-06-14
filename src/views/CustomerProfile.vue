<template>
  <div class="profile-page">
    <div class="profile-card">
      <h2>Profil Pelanggan</h2>
      <div v-if="customer" class="profile-details">
        <p><strong>Nama:</strong> {{ customer.name }}</p>
        <p><strong>Email:</strong> {{ customer.email }}</p>
        <p><strong>Nomor Telepon:</strong> {{ customer.phoneNumber }}</p>
        <p><strong>Alamat:</strong> {{ customer.address }}</p>
      </div>
      <div v-else>
        <p>Mengambil data pelanggan...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
    };
  },
  async mounted() {
    try {
      const name = this.$route.params.name;
      const res = await fetch(`http://localhost:8080/api/customers/${encodeURIComponent(name)}`);
      this.customer = await res.json();
    } catch (err) {
      console.error('Gagal mengambil data pelanggan:', err);
    }
  },
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: url('/images/ale2.jpg') center/cover no-repeat;
  padding: 3rem 1rem;
}

.profile-card {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  font-family: "Poppins", sans-serif;
  animation: fadeIn 0.8s ease-in;
}

.profile-card h2 {
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 1.8rem;
  text-align: center;
  color: #333;
}

.profile-details p {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #444;
}
</style>
