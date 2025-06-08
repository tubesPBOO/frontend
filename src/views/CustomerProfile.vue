<template>
  <div class="container mt-5">
    <h2 class="mb-4">Customer Profile</h2>
    <div v-if="customer">
      <ul class="list-group">
        <li class="list-group-item"><strong>Name:</strong> {{ customer.name }}</li>
        <li class="list-group-item"><strong>Email:</strong> {{ customer.email }}</li>
        <li class="list-group-item"><strong>Phone:</strong> {{ customer.phoneNumber }}</li>
        <li class="list-group-item"><strong>Address:</strong> {{ customer.address }}</li>
        <li class="list-group-item"><strong>Role:</strong> {{ customer.role }}</li>
        <li class="list-group-item"><strong>Username:</strong> {{ customer.username }}</li>
        <li class="list-group-item"><strong>Enabled:</strong> {{ customer.enabled }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Loading customer data...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customer: null,
    };
  },
  async mounted() {
    try {
      const name = this.$route.params.name;
      const res = await fetch(`/api/customers/${encodeURIComponent(name)}`);
      this.customer = await res.json();
    } catch (err) {
      console.error('Failed to fetch customer:', err);
    }
  },
};
</script>

<style scoped>
.container {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
