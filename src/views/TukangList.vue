<template>
  <div class="tukang-page">
    <div class="form-glass">
      <h2>Daftar Tukang</h2>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>No. Telepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="worker in workers" :key="worker.id">
            <td>{{ worker.name }}</td>
            <td>{{ worker.email }}</td>
            <td>{{ worker.phoneNumber }}</td>
            <td>
            <button @click="deleteTukang(worker.name)" class="action-button">
              Delete
            </button>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workers: [],
      name:''
    };
  },
  async mounted() {
    try {
      const res = await fetch('http://localhost:8080/api/admin/getTukangList');
      this.workers = await res.json();
    } catch (err) {
      console.error('Gagal mengambil data tukang:', err);
    }
  },
   methods: {
    async deleteTukang(name) {
      const confirmed = confirm(`Apakah kamu yakin ingin menghapus tukang bernama "${name}"?`);
      if (!confirmed) return;

      try {
        const response = await fetch(`http://localhost:8080/api/admin/deleteTukang/${encodeURIComponent(name)}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          this.workers = this.workers.filter(c => c.name !== name);
          alert("Tukang berhasil dihapus");
        } else {
          alert("Gagal menghapus tukang");
        }
      } catch (err) {
        console.error('Error saat menghapus tukang:', err);
        alert("Terjadi kesalahan saat menghapus tukang");
      }
    }
  }
};
</script>

<style scoped>
.tukang-page {
  min-height: 100vh;
  background: url('/images/Nordwood.jpg') center/cover no-repeat;
  display: flex;
  justify-content: center;     
  align-items: flex-start;     
  padding: 3rem 1rem;          
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.form-glass {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.8s ease forwards;
  overflow-x: auto;
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

h2 {
  font-family: "Poppins", sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Poppins", sans-serif;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.styled-table thead {
  background-color: rgba(255, 255, 255, 0.2);
}

.styled-table th, .styled-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.styled-table tr:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.action-button {
  background-color: white;
  color: black;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.action-button:hover {
  transform: scale(1.05);
  background-color: #f0f0f0;
}
</style>
