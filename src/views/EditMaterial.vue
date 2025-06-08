<template>
  <div class="container mt-5">
    <h2 class="mb-4">Edit Material</h2>
    <div class="mb-3">
      <input v-model="materialName" class="form-control" placeholder="Nama Material" />
    </div>

    <div class="mb-3">
      <label for="price">Harga</label>
      <input v-model.number="price" id="price" type="number" class="form-control" placeholder="Masukkan harga baru" />
      <button class="btn btn-primary mt-2" @click="updatePrice">Update Harga</button>
    </div>

    <div class="mb-3">
      <label for="stock">Stok</label>
      <input v-model.number="stock" id="stock" type="number" class="form-control" placeholder="Masukkan stok baru" />
      <button class="btn btn-primary mt-2" @click="updateStock">Update Stok</button>
    </div>

    <div class="mb-3">
      <label for="rating">Rating</label>
      <input v-model.number="rating" id="rating" type="number" step="0.1" class="form-control" placeholder="Masukkan rating baru" />
      <button class="btn btn-primary mt-2" @click="updateRating">Update Rating</button>
    </div>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
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
        if (!res.ok) throw new Error('Failed to update price');
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
        if (!res.ok) throw new Error('Failed to update stock');
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
        if (!res.ok) throw new Error('Failed to update rating');
        this.successMessage = 'Rating berhasil diperbarui';
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
