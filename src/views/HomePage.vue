<template>
    <div>
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand fw-bold text-warning" href="#">
                    <span class="text-white">Tukang.In</span>
                </a>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#">PROJECTS</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">CART</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">PROFILE</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- HERO SECTION -->
        <header class="hero-section text-center text-white d-flex align-items-center justify-content-center">
            <div>
                <h1 class="display-4 fw-bold">
                    LEADERS IN QUALITY<br />CONSTRUCTION AND INFRASTRUCTURE
                </h1>
                <p class="lead mt-3">"Building the future, restoring the past."</p>
                <div class="mt-4">
                    <i class="bi bi-chevron-double-down fs-2 text-white"></i>
                </div>
            </div>
        </header>

        <div class="container py-5">
            <!-- My Projects -->
            <div class="mb-5">
                <h4 class="fw-semibold mb-3">My Projects</h4>

                <div v-if="projects.length > 0" class="row row-cols-1 row-cols-md-2 g-4">
                    <div v-for="project in projects" :key="project.id" class="col">
                        <div class="card shadow-sm position-relative h-100 overflow-hidden"
                            @mouseover="hoveredProject = project" @mouseleave="hoveredProject = null">
                            <!-- Project Image -->
                            <img :src="'/images/ale.jpg'" alt="Project Image" class="card-img-top img-fluid"
                                style="object-fit: cover; height: 200px" />

                            <!-- Project Name (always visible) -->
                            <div class="p-3 bg-dark text-white">
                                <h5 class="card-title mb-0">{{ project.name }}</h5>
                            </div>

                            <!-- Overlay for project details -->
                            <div class="overlay d-flex flex-column justify-content-between p-3"
                                :class="{ 'show-overlay': hoveredProject === project }">
                                <div>
                                    <h5 class="card-title">{{ project.name }}</h5>
                                    <p class="card-text">
                                        <strong>Deskripsi:</strong> {{ project.deskripsi }}<br />
                                        <strong>Kota:</strong> {{ project.alamatKota }}<br />
                                        <strong>Durasi:</strong> {{ project.durasi }} hari<br />
                                        <strong>Tukang Dibutuhkan:</strong> {{ project.jumTukang }}<br />
                                        <strong>Total Biaya:</strong> Rp{{ project.price.toLocaleString('id-ID') }}
                                    </p>
                                </div>
                                <div>
                                    <span class="badge bg-success">{{ project.status }}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div v-else class="text-muted">Kamu belum memiliki proyek apa pun.</div>
            </div>


            <!-- Search and Cart Summary -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <input v-model="searchTerm" type="text" class="form-control me-3 w-50"
                    placeholder="Search materials..." />
                <div>
                    <button class="btn btn-outline-secondary" @click="showCart = true">
                        🛒 Cart ({{ groupedCart.length }})
                    </button>
                </div>
            </div>

            <!-- Available Materials -->
            <div class="mb-5">
                <h4 class="fw-semibold mb-3">Available Materials</h4>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div v-for="material in filteredMaterials" :key="material.id" class="col">
                        <div class="card h-100 shadow-sm">
                            <img :src="material.image" class="card-img-top" alt="Material Image"
                                style="height: 160px; object-fit: cover;" />
                            <div class="card-body">
                                <h5 class="card-title">{{ material.name }}</h5>
                                <p class="card-text">{{ material.description }}</p>
                                <p class="fw-bold">Rp{{ material.price.toLocaleString('id-ID') }}</p>
                                <button class="btn btn-outline-primary w-100" @click="addToCart(material)">
                                    ➕ Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cart Modal -->
            <div v-if="showCart" class="modal d-block" tabindex="-1">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">My Cart</h5>
                            <button type="button" class="btn-close" @click="showCart = false"></button>
                        </div>
                        <div class="modal-body">
                            <ul class="list-group">
                                <li v-for="(item, index) in groupedCart" :key="index"
                                    class="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{{ item.name }} {{ item.quantity > 1 ? `x${item.quantity}` : ''
                                            }}</strong><br />
                                        <small>Rp{{ (item.price * item.quantity).toLocaleString('id-ID') }}</small>
                                    </div>
                                    <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">Remove</button>
                                </li>
                            </ul>
                            <div class="mt-3 text-end">
                                <strong>Total: Rp{{ cartTotal }}</strong>
                                <router-link to="/payment" class="btn btn-success mt-3 w-100" @click.native="storeCart">
                                    Proceed to Payment
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Header Section with the 'Add Project' Button -->
            <div class="header">
                <div class="d-flex justify-content-between align-items-center">
                    <h1>Tukang.In</h1>
                    <button class="btn btn-primary" @click="showAddProject = true">Add Project</button>
                </div>
            </div>

            <!-- Add Project Modal -->
            <div v-if="showAddProject" class="modal d-block" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create New Project</h5>
                            <button type="button" class="btn-close" @click="showAddProject = false"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="addProject">
                                <div class="mb-3">
                                    <label class="form-label">Project Name</label>
                                    <input v-model="newProject.name" type="text" class="form-control" required />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Workers Needed</label>
                                    <input v-model="newProject.jumTukang" type="number" class="form-control" required />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Duration (days)</label>
                                    <input v-model="newProject.durasi" type="number" class="form-control" required />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Description</label>
                                    <textarea v-model="newProject.deskripsi" class="form-control" required></textarea>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">City</label>
                                    <input v-model="newProject.alamatKota" type="text" class="form-control" required />
                                </div>

                                <button type="submit" class="btn btn-success w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DashboardPage',
    data() {
        return {
            projects: [],
            showAddProject: false,
            showCart: false,
            searchTerm: '',
            newProject: {
                name: '',
                materials: '',
                tukangCount: 0,
                duration: 0,
            },
            cart: [],
            hoveredProject: null,
            searchTerm: '',
            materials: [],
            showCart: false,
        };
    },
    computed: {
        filteredMaterials() {
            return this.materials.filter((m) =>
                m.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
        groupedCart() {
            const grouped = [];
            this.cart.forEach((item) => {
                const found = grouped.find((groupItem) => groupItem.name === item.name);
                if (found) {
                    found.quantity++;
                } else {
                    grouped.push({ ...item, quantity: 1 });
                }
            });
            return grouped;
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        },
        filteredMaterials() {
            return this.materials.filter((m) =>
                m.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
        groupedCart() {
            const grouped = [];
            this.cart.forEach((item) => {
                const existing = grouped.find((g) => g.id === item.id);
                if (existing) {
                    existing.quantity++;
                } else {
                    grouped.push({ ...item, quantity: 1 });
                }
            });
            return grouped;
        },
        cartTotal() {
            return this.groupedCart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString('id-ID');
        },
    },
    mounted() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
        this.fetchMyProjects();
        this.fetchMaterials();
        this.loadCartFromStorage();
    },

    methods: {
        async addProject() {
            const payload = {
                name: this.newProject.name,
                deskripsi: this.newProject.deskripsi,
                alamatKota: this.newProject.alamatKota,
                durasi: this.newProject.durasi,
                jumTukang: this.newProject.jumTukang,
                listTukang: [],
                status: 'Looking for Tukang'
            };

            try {
                const response = await fetch('http://localhost:8080/api/customers/addProject', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                const resultText = await response.text();
                console.log('Server response:', resultText);
                alert(resultText);

                this.showAddProject = false;
                this.newProject = {
                    name: '',
                    deskripsi: '',
                    alamatKota: '',
                    durasi: 0,
                    jumTukang: 0,
                    listTukang: [],
                    status: 'Looking for Tukang'
                };
            } catch (error) {
                console.error('Error adding project:', error);
                alert('Failed to add project: ' + error.message);
            }
        },
        async fetchMyProjects() {
            try {
                const response = await fetch('http://localhost:8080/api/customers/getMyProject', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                console.log('Fetched projects:', data);
                this.projects = data;

            } catch (error) {
                console.error('Failed to fetch projects:', error);
                alert('Gagal ambil data project: ' + error.message);
            }
        },
        async fetchMaterials() {
            try {
                const res = await fetch('http://localhost:8080/api/materials');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                this.materials = data.map((mat) => ({
                    ...mat,
                    image: '/images/material-placeholder.jpg', // default image
                    description: `Stock: ${mat.stock} | Rating: ${mat.totrating} (${mat.ratingCount} reviews)`,
                }));
            } catch (err) {
                console.error('Fetch error:', err);
            }
        },
        addToCart(material) {
            this.cart.push(material);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeFromCart(index) {
            const itemToRemove = this.groupedCart[index];
            let foundIndex = this.cart.findIndex((item) => item.id === itemToRemove.id);
            if (foundIndex !== -1) {
                this.cart.splice(foundIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        storeCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        loadCart() {
            const saved = localStorage.getItem('cart');
            if (saved) this.cart = JSON.parse(saved);
        },
    },
    mounted() {
        this.fetchMaterials();
        this.loadCart();
    },
};
</script>

<style scoped>
.card {
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.overlay.show-overlay {
    opacity: 1;
}

.hero-section {
    height: 100vh;
    background: url('/images/construction.jpg') center/cover no-repeat;
    padding-top: 80px;
}

nav.navbar {
    z-index: 1000;
}
</style>