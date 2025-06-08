<template>
  <div class="container mt-5">
    <h2 class="mb-4">Daftar Order Tukang</h2>
    <button class="btn btn-primary mb-3" @click="fetchOrders">Ambil Order Saya</button>

    <div v-if="orders.length === 0">Belum ada order yang ditemukan.</div>

    <div v-for="order in orders" :key="order.id" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Order: {{ order.name }}</h5>
        <p class="card-text">ID: {{ order.id }}</p>
        <p class="card-text">Total Harga: Rp {{ order.price.toLocaleString() }}</p>
        <p class="card-text">Jumlah Tukang: {{ order.tukangCount }}</p>

        <div>
          <strong>📦 Material:</strong>
          <ul>
            <li v-for="material in order.materials" :key="material.id">
              {{ material.name }} (Rp {{ material.price.toLocaleString() }}) | Stok: {{ material.stock }} | Rating: {{ material.totrating }}
            </li>
          </ul>
        </div>

        <div>
          <strong>🧑‍🔧 Tukang yang Dilibatkan:</strong>
          <ul>
            <li v-for="tukang in order.tukangs" :key="tukang.id">
              {{ tukang.name }} - {{ tukang.phoneNumber }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TukangOrderList',
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await fetch('/api/tukang/getOrders');
        if (!res.ok) throw new Error('Gagal mengambil data order tukang');
        const data = await res.json();
        this.orders = data;
      } catch (err) {
        alert('Error: ' + err.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
