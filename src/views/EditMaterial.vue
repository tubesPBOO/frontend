<template>
  <div class="material-list-page">
    <input
      v-model="searchQuery"
      type="text"
      class="search-box"
      placeholder="Cari nama material..."
    />

    <div class="material-grid">
      <div
        v-for="(material, index) in filteredMaterials"
        :key="index"
        class="form-glass"
      >
        <h3>{{ material.name }}</h3>
        <p>Harga: Rp{{ material.price }}</p>
        <p>Stok: {{ material.stock }}</p>
        <p>Rating: {{ material.totrating || 0 }} ({{ material.countrating || 0 }} suara)</p>

        <label>Edit Harga</label>
        <input v-model.number="material.editedPrice" type="number" placeholder="Harga baru" />
        <button @click="updatePrice(material)">Update Harga</button>

        <label>Edit Stok</label>
        <input v-model.number="material.editedStock" type="number" placeholder="Stok baru" />
        <button @click="updateStock(material)">Update Stok</button>

        <p v-if="material.successMessage" class="response">{{ material.successMessage }}</p>
      </div>
    </div>

    <button class="toggle-btn" @click="toggleShow">
      {{ showAll ? 'Show Less' : 'Show More' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materials: [],
      searchQuery: '',
      showAll: false,
    };
  },
  computed: {
    filteredMaterials() {
      const filtered = this.materials.filter((m) =>
        m.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      return this.showAll ? filtered : filtered.slice(0, 6); // tampilkan 6 box dulu (2 baris)
    },
  },
  methods: {
    async fetchMaterials() {
      try {
        const res = await fetch("http://localhost:8080/api/materials"); // ganti sesuai endpoint Anda
        const data = await res.json();
        this.materials = data.map((m) => ({
          ...m,
          editedPrice: m.price,
          editedStock: m.stock,
          successMessage: '',
        }));
      } catch (error) {
        console.error("Gagal fetch materials", error);
      }
    },
    async updatePrice(material) {
      try {
        const res = await fetch(`http://localhost:8080/api/admin/updatePrice/${encodeURIComponent(material.name)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ price: material.editedPrice }),
        });
        if (!res.ok) throw new Error("Gagal update harga");
        material.price = material.editedPrice;
        material.successMessage = "Harga berhasil diperbarui";
      } catch (err) {
        alert(err.message);
      }
    },
    async updateStock(material) {
      try {
        const res = await fetch(`http://localhost:8080/api/admin/updateStock/${encodeURIComponent(material.name)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: material.editedStock }),
        });
        if (!res.ok) throw new Error("Gagal update stok");
        material.stock = material.editedStock;
        material.successMessage = "Stok berhasil diperbarui";
      } catch (err) {
        alert(err.message);
      }
    },
    toggleShow() {
      this.showAll = !this.showAll;
    },
  },
  mounted() {
    this.fetchMaterials();
  },
};
</script>

<style scoped>
.material-list-page {
  min-height: 100vh;
  background: url('/images/Nordwood.jpg') center/cover no-repeat;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-box {
  margin-bottom: 2rem;
  padding: 10px 15px;
  width: 100%;
  max-width: 600px;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
}

.search-box::placeholder {
  color: #ccc;
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
}

.form-glass {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.8s ease forwards;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: "Poppins", sans-serif;
}

label, p {
  text-align: left;
  margin: 0.5rem 0 0.3rem;
  font-family: "Poppins", sans-serif;
}

input {
  display: block;
  margin-bottom: 0.5rem;
  padding: 10px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: white;
}

input::placeholder {
  color: #ccc;
}

button {
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  padding: 10px;
  width: 100%;
  background-color: white;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #e6e6e6;
}

.response {
  color: #2ecc71;
  font-weight: 600;
  font-size: 0.9rem;
}

.toggle-btn {
  margin-top: 1.5rem;
  padding: 12px 24px;
  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background-color: #ddd;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
