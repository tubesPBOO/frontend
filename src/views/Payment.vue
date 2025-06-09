<template>
    <div class="container py-5">
        <h2 class="fw-bold mb-4">Payment Summary</h2>

        <div class="card mb-4">
            <div v-for="(item, index) in cart" :key="index"
                class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0">{{ item.name }}</h6>
                    <small>${{ item.price }}</small>
                </div>
            </div>
        </div>
        
        <div class="card mb-4">
            <div class="card-body">
                <p><strong>Total Items:</strong> {{ cart.length }}</p>
                <p><strong>Total Amount:</strong> ${{ cartTotal }}</p>
                <p><strong>Checkout Date:</strong> {{ checkoutDate }}</p>
                <img :src="qrCodeDataUrl" alt="QR Code" class="img-fluid mt-3" style="max-width: 200px;" />
            </div>
        </div>

    </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
    name: 'PaymentPage',
    data() {
        return {
            cart: [],
            qrCodeDataUrl: '',
            checkoutDate: new Date().toLocaleString()
        };
    },
    computed: {
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        }
    },
    async mounted() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }

        const paymentInfo = `Total: $${this.cartTotal} | Items: ${this.cart.length} | Date: ${this.checkoutDate}`;
        this.qrCodeDataUrl = await QRCode.toDataURL(paymentInfo);
    }
};
</script>
