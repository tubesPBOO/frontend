<template>
  <div class="container mt-5">
    <h2 class="mb-4">Tambah Order Customer</h2>

    <div class="mb-3">
      <label>Order ID</label>
      <input v-model.number="order.id" type="number" placeholder="Contoh: 103" class="form-control" />
    </div>

    <div class="mb-3">
      <label>Order Name</label>
      <input v-model="order.name" type="text" placeholder="Contoh: Order-103" class="form-control" />
    </div>

    <div class="mb-3">
      <label>List Material</label>
      <div v-for="(material, i) in order.materials" :key="i" class="input-group mb-2">
        <input
          v-model="material.name"
          type="text"
          class="form-control"
          placeholder="Nama Material"
        />
        <button class="btn btn-danger" @click="removeMaterial(i)">Hapus</button>
      </div>
      <button class="btn btn-outline-primary btn-sm" @click="addMaterial">+ Tambah Material</button>
    </div>

    <div class="mb-3">
      <label>Jumlah Tukang</label>
      <input v-model.number="order.tukangCount" type="number" class="form-control" placeholder="Contoh: 2" />
    </div>

    <button class="btn btn-success w-100 mt-3" @click="submitOrder">Kirim Order</button>

    <div v-if="response" class="alert alert-info mt-4">
      <h5>✅ Order Berhasil Dikirim</h5>
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddOrder',
  data() {
    return {
      order: {
        id: null,
        name: '',
        materials: [{ name: '' }],
        tukangCount: 1,
      },
      response: null,
    };
  },
  methods: {
    addMaterial() {
      this.order.materials.push({ name: '' });
    },
    removeMaterial(index) {
      this.order.materials.splice(index, 1);
    },
    async submitOrder() {
      try {
        const res = await fetch('/api/customers/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.order),
        });

        if (!res.ok) throw new Error('Gagal mengirim order ke server');

        const data = await res.json();
        this.response = JSON.stringify(data, null, 2);
      } catch (err) {
        alert('Error: ' + err.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
