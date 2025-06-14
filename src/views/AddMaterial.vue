<template>
  <div class="material-page">
    <div class="form-glass">
      <h2> Tambah Bahan Material</h2>
      <form @submit.prevent="submitMaterial">
        <input v-model="material.name" placeholder="Nama Material" required />
        <input v-model.number="material.stock" type="number" placeholder="Jumlah Stok" required />
        <input v-model.number="material.price" type="number" placeholder="Harga per Unit (Rp)" required />
        <!--<input v-model.number="material.totrating" type="number" placeholder=""/>-->
        <!--<input v-model.number="material.ratingCount" type="number" placeholder=""/>-->
        <button type="submit">Tambah Material</button>
      </form>
      <p v-if="responseMessage" class="response">{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'addMaterials',
    data() {
        return {
            material: {
                name: '',
                stock: '',
                price: '',
                ratingCount: 0,
                totrating: 0
            },
            responseMessage: ''
        };
    },
    methods: {
        async submitMaterial() {
            try {
                const response = await fetch('http://localhost:8080/api/admin/addMaterials', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.material)
                });

        if (response.ok) {
          const data = await response.json();
          this.responseMessage = `Material berhasil ditambahkan!`;
          this.material.name = '';
          this.material.stock = '';
          this.material.price = '';
          this.material.totrating = 0;
          this.material.ratingCount = 0;
        } else {
          const errText = await response.text();
          this.responseMessage = `Gagal menambahkan! : ${errText}`;
        }
      } catch (err) {
        this.responseMessage = `Terjadi kesalahan! : ${err.message}`;
      }
    }
  }
};
</script>

<style scoped>
.material-page {
  min-height: 100vh;
  background: url('/images/Nordwood.jpg') center/cover no-repeat; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  backdrop-filter: blur(2px);
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-glass {
  background: rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: white;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.8s ease forwards;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

h2 {
  font-family: "Poppins", sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

input {
  display: block;
  margin: 12px auto;
  padding: 10px 15px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  transition: background 0.3s ease, transform 0.2s ease;
}

input:focus {
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  transform: scale(1.02);
}

input::placeholder {
  color: #ccc;
}

button {
  width: 100%;
  margin-top: 1rem;
  padding: 12px;
  background-color:  #ffffff;
  color: #000000;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

button:hover {
  background-color:#ffffff;
  transform: scale(1.02);
}

.response {
  margin-top: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  animation: fadeIn 0.5s ease-in;
}
</style>