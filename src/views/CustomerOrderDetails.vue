<template>
  <div class="container mt-5">
    <h2 class="mb-4">Daftar Detail Order Customer</h2>
    <button class="btn btn-primary mb-3" @click="fetchOrders">Ambil Data Order</button>

    <div v-if="orders.length === 0">Belum ada data order.</div>

    <div v-for="(order, index) in orders" :key="index" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Order ID: {{ order.orderId }}</h5>
        <p class="card-text">Alamat Pengiriman: {{ order.deliveryAddress }}</p>
        <p class="card-text">Tracking: {{ order.trackingNumber }}</p>
        <p class="card-text">Status: {{ order.status }} | Pengiriman: {{ order.deliveryStatus }}</p>
        <p class="card-text">Metode Bayar: {{ order.payMethod }} | Tanggal: {{ formatDate(order.payDate) }}</p>

        <div v-if="order.customer">
          <p><strong>Customer:</strong> {{ order.customer.name }} ({{ order.customer.phoneNumber }})</p>
        </div>

        <div v-if="order.customer.orders && order.customer.orders.length">
          <h6>📦 Detail Pesanan:</h6>
          <div v-for="custOrder in order.customer.orders" :key="custOrder.id" class="mb-3 ps-3 border-start">
            <p><strong>{{ custOrder.name }}</strong> - Total: Rp {{ custOrder.price.toLocaleString() }}</p>
            <p>Jumlah Tukang: {{ custOrder.tukangCount }}</p>
            <ul>
              <li v-for="mat in custOrder.materials" :key="mat.id">
                {{ mat.name }} (Rp {{ mat.price.toLocaleString() }}) - Stock: {{ mat.stock }} - Rating: {{ mat.totrating }}
              </li>
            </ul>
            <div v-if="custOrder.tukangs.length">
              <p class="fw-bold">Tukang yang Ditugaskan:</p>
              <ul>
                <li v-for="tk in custOrder.tukangs" :key="tk.id">
                  {{ tk.name }} - {{ tk.phoneNumber }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerOrderDetails',
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await fetch('/api/customers/getOrdersDetail');
        if (!res.ok) throw new Error('Gagal ambil data order');
        const data = await res.json();
        this.orders = data;
      } catch (err) {
        alert('Error: ' + err.message);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString('id-ID');
    }
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
