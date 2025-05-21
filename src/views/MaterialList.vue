<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center">📦 Materials List</h1>

    <div class="text-center mb-4">
      <router-link to="/materials/add">
        <button class="btn btn-primary">
          ➕ Add Material
        </button>
      </router-link>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3" v-for="material in materials" :key="material.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ material.name }}</h5>
            <p class="card-text">💸 Price: {{ material.price }}</p>
            <p class="card-text">📦 Stock: {{ material.stock }}</p>
            <p class="card-text">⭐ Rating: {{ material.totrating }} ({{ material.ratingCount }} reviews)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AddMaterial from './AddMaterial.vue';
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
