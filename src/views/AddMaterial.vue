<template>
    <div style="margin-top: 2rem">
        <h2>➕ Add New Material</h2>

        <form @submit.prevent="submitMaterial">
            <input v-model="material.name" placeholder="Material Name" required />
            <input v-model.number="material.stock" type="number" placeholder="Stock" required />
            <input v-model.number="material.price" type="number" placeholder="Price" required />
            <button type="submit">Add Material</button>
        </form>

        <p v-if="responseMessage">{{ responseMessage }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            material: {
                name: '',
                stock: 0,
                price: 0,
                ratingCount: 0,
                totrating: 0.0
            },
            responseMessage: ''
        };
    },
    methods: {
        async submitMaterial() {
            try {
                const response = await fetch('http://localhost:8080/api/admin/materials', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.material)
                });

                if (response.ok) {
                    const data = await response.json();
                    this.responseMessage = `✅ Material created! ID: ${data.id}`;
                    console.log('Created Material:', data);

                    // reset form
                    this.material.name = '';
                    this.material.stock = 0;
                    this.material.price = 0;
                } else {
                    const errText = await response.text();
                    this.responseMessage = `❌ Failed: ${errText}`;
                }
            } catch (err) {
                this.responseMessage = `⚠️ Error: ${err.message}`;
            }
        }
    }
};
</script>

<style scoped>
input {
    display: block;
    margin: 10px auto;
    padding: 8px;
    width: 60%;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 10px;
    background-color: #2d89ef;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #1b61c1;
}

p {
    margin-top: 1rem;
    color: green;
}
</style>
