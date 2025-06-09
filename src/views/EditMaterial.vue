<template>
  <div class="edit-material-page">
    <div class="form-glass">
      <h2>Edit Bahan Material</h2>

      <input v-model="materialName" placeholder="Nama Material" required />

      <label for="price">Harga Baru</label>
      <input v-model.number="price" id="price" type="number" placeholder="Masukkan harga baru" />
      <button @click="updatePrice">Update Harga</button>

      <label for="stock">Stok Baru</label>
      <input v-model.number="stock" id="stock" type="number" placeholder="Masukkan stok baru" />
      <button @click="updateStock">Update Stok</button>

      <label for="rating">Rating Baru</label>
      <input v-model.number="rating" id="rating" type="number" step="0.1" placeholder="Masukkan rating baru" />
      <button @click="updateRating">Update Rating</button>

      <p v-if="successMessage" class="response">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materialName: '',
      price: null,
      stock: null,
      rating: null,
      successMessage: '',
    };
  },
  methods: {
    async updatePrice() {
      try {
        const res = await fetch(`/api/materials/price/${encodeURIComponent(this.materialName)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ price: this.price }),
        });
        if (!res.ok) throw new Error('Gagal memperbarui harga');
        this.successMessage = 'Harga berhasil diperbarui';
      } catch (err) {
        alert(err.message);
      }
    },
    async updateStock() {
      try {
        const res = await fetch(`/api/materials/price/${encodeURIComponent(this.materialName)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: this.stock }),
        });
        if (!res.ok) throw new Error('Gagal memperbarui stok');
        this.successMessage = 'Stok berhasil diperbarui';
      } catch (err) {
        alert(err.message);
      }
    },
    async updateRating() {
      try {
        const res = await fetch(`/api/materials/rating/${encodeURIComponent(this.materialName)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ totrating: this.rating }),
        });
        if (!res.ok) throw new Error('Gagal memperbarui rating');
        this.successMessage = 'Rating berhasil diperbarui';
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
</script>

<style scoped>
.edit-material-page {
  min-height: 100vh;
  background: url('/images/ale2.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-glass {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.8s ease forwards;
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

input {
  display: block;
  margin: 12px auto;
  padding: 10px 15px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  transition: background 0.3s ease, transform 0.2s ease;
}

input:focus {
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  transform: scale(1.02);
}

input::placeholder {
  color: #ccc;
}

h2 {
  font-family: "Poppins", sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

label {
  display: block;
  text-align: left;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 0.95rem;
  font-family: "Poppins", sans-serif;
}

button {
  width: 100%;
  margin-top: 0.5rem;
  padding: 12px;
  background-color: #FFF;
  color: black;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

button:hover {
  background-color: #FFF;
  transform: scale(1.02);
}

.response {
  margin-top: 1.2rem;
  font-weight: 600;
  color: #2ecc71;
  animation: fadeIn 0.5s ease-in;
}
</style>
