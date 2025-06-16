<template>
  <div style="background-color: #f8f9fa; min-height: 100vh;">
    <div class="container py-5">
      <h3 class="fw-bold mb-4 text-primary">📦 Daftar Order Anda</h3>

      <div v-if="orders.length === 0" class="text-muted">Belum ada order ditemukan.</div>

      <div v-for="order in orders" :key="order.orderId" class="card mb-3 shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center">
          <strong>Order ID: {{ order.orderId }}</strong>
          <span class="badge bg-secondary">{{ order.status }}</span>
        </div>
        <div class="card-body">
          <p><strong>Alamat Pengiriman:</strong> {{ order.deliveryAddress }}</p>
          <p><strong>Status Pengiriman:</strong> {{ order.deliveryStatus }}</p>
          <p><strong>Metode Bayar:</strong> {{ order.payMethod }}</p>
          <p><strong>Tanggal Bayar:</strong> {{ new Date(order.payDate).toLocaleString('id-ID') }}</p>
          <p><strong>Nomor Resi:</strong> {{ order.trackingNumber }}</p>

          <h6 class="mt-3">🧱 Material dalam Order:</h6>
          <ul class="list-group">
            <li
              v-for="material in flattenMaterials(order.customer.orders, order.orderId)"
              :key="material.id"
              class="list-group-item"
            >
              {{ material.name }} - Rp{{ material.price.toLocaleString('id-ID') }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Tombol kembali ke Home -->
      <div class="text-center mt-4">
        <router-link to="/HomePage" class="btn btn-outline-primary">
          ⬅️ Kembali ke HomePage
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerOrderList",
  data() {
    return {
      orders: []
    };
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await fetch("http://localhost:8080/api/customers/getOrdersDetail");
        if (!res.ok) throw new Error("Gagal fetch order");
        const data = await res.json();
        this.orders = data;
      } catch (err) {
        console.error("❌ Gagal mengambil order:", err);
        alert("Gagal ambil data order");
      }
    },
    flattenMaterials(orderList, targetOrderId) {
      const order = orderList.find(o => o.id === targetOrderId);
      return order?.materials || [];
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>

<!-- Global background fix -->
<style>
body {
  background-color: #f8f9fa !important;
}
</style>
