<template>
  <div>
    <h1>Materials List</h1>
    <div v-for="material in materials" :key="material.id" class="material">
      <h3>{{ material.name }}</h3>
      <p>Price: {{ material.price }}</p>
      <p>Stock: {{ material.stock }}</p>
      <p>Rating: {{ material.totrating }} ({{ material.ratingCount }} reviews)</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materials: [], // to store the materials data
    };
  },
  mounted() {
    // Fetch the data from the API when the component is mounted
    this.fetchMaterials();
  },
  methods: {
    // Method to fetch data from the API
    async fetchMaterials() {
      try {
        const response = await fetch('http://localhost:8080/api/materials');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.materials = data; // Set the materials data to the component's state
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
  },
};
</script>

<style scoped>
.material {
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
