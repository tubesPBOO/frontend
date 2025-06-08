<template>
  <div class="container mt-5">
    <h2 class="mb-4">Customer List</h2>
    <table class="table table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cust in customers" :key="cust.id">
          <td>{{ cust.name }}</td>
          <td>{{ cust.email }}</td>
          <td>{{ cust.phoneNumber }}</td>
          <td>{{ cust.address }}</td>
          <td>
            <router-link :to="`/customer/${cust.name}`" class="btn btn-sm btn-primary">View</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch('/api/customers');
      this.customers = await res.json();
    } catch (err) {
      console.error('Failed to fetch customers:', err);
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
