<template>
  <div style="background-color: #f8f9fa;">
    <div class="container py-5 animate__animated animate__fadeIn">
      <h2 class="fw-bold mb-4 text-dark">Payment Summary</h2>

      <!-- List Items -->
      <div class="card shadow-sm mb-4">
        <div class="card-header bg-info text-white fw-semibold">
          Items in Your Cart
        </div>
        <ul class="list-group list-group-flush">
          <li v-for="(item, index) in groupedCart" :key="index"
            class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1">{{ item.name }}</h6>
              <small>Rp{{ (item.price).toLocaleString('id-ID') }}</small>
            </div>
            <span class="badge bg-secondary rounded-pill">
              x{{ item.quantity }}
            </span>
          </li>
        </ul>

      </div>

      <!-- Summary + QR Code -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <p><strong>Total Items:</strong> {{ cart.length }}</p>
          <p>
            <strong>Total Amount:</strong>
            Rp{{ cartTotal.toLocaleString('id-ID') }}
          </p>
          <p><strong>Checkout Date:</strong> {{ checkoutDate }}</p>
          <div class="text-center mt-4">
            <img :src="qrCodeDataUrl" alt="QR Code" class="img-fluid" style="max-width: 200px" />
            <p class="text-muted mt-2">Scan QR untuk melanjutkan pembayaran</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <router-link to="/orders" class="btn btn-outline-primary">
          📦 Lihat Semua Order Saya
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  name: "PaymentPage",
  data() {
    return {
      cart: [],
      qrCodeDataUrl: "",
      checkoutDate: new Date().toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );
    },
    groupedCart() {
      const grouped = [];
      this.cart.forEach((item) => {
        const existing = grouped.find((g) => g.name === item.name && g.price === item.price);
        if (existing) {
          existing.quantity = (existing.quantity || 1) + 1;
        } else {
          grouped.push({ ...item, quantity: 1 });
        }
      });
      return grouped;
    },
  },
  async mounted() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }

    const paymentInfo = `Total: Rp${this.cartTotal.toLocaleString(
      "id-ID"
    )} | Items: ${this.cart.length} | Date: ${this.checkoutDate}`;
    this.qrCodeDataUrl = await QRCode.toDataURL(paymentInfo);
  },
};
</script>

<style scoped>
.container,
.card,
.card-body,
.list-group-item {
  font-family: 'Poppins', sans-serif;
}

.card {
  border-radius: 1rem;
}

h2 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.animate__animated.animate__fadeIn {
  animation-duration: 0.9s;
}
</style>
