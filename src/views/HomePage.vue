<template>
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
            <h1 class="display-4 fw-bold">LEADERS IN QUALITY<br />CONSTRUCTION AND INFRASTRUCTURE</h1>
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
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div v-for="project in projects" :key="project.id" class="col">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">{{ project.name }}</h5>
                            <p class="card-text">
                                <strong>Materials:</strong> {{ project.materials }} <br />
                                <strong>Workers Needed:</strong> {{ project.tukangCount }} <br />
                                <strong>Duration:</strong> {{ project.duration }} days
                            </p>
                            <span class="badge bg-success">{{ project.status }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- Search and Cart Summary -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <input v-model="searchTerm" type="text" class="form-control me-3 w-50" placeholder="Search materials..." />
            <div>
                <button class="btn btn-outline-secondary" @click="showCart = true">
                    🛒 Cart ({{ cart.length }})
                </button>
            </div>
        </div>

        <!-- Available Materials -->
        <div class="mb-5">
            <h4 class="fw-semibold mb-3">Available Materials</h4>
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div v-for="material in filteredMaterials" :key="material.id" class="col">
                    <div class="card h-100 shadow-sm">
                        <img :src="material.image" class="card-img-top" alt="Material Image" />
                        <div class="card-body">
                            <h5 class="card-title">{{ material.name }}</h5>
                            <p class="card-text">{{ material.description }}</p>
                            <p class="fw-bold">${{ material.price }}</p>
                            <button class="btn btn-outline-primary w-100" @click="addToCart(material)">Add to
                                Cart</button>
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
                            <li v-for="(item, index) in cart" :key="index"
                                class="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{{ item.name }}</strong><br />
                                    <small>${{ item.price }}</small>
                                </div>
                                <button class="btn btn-sm btn-danger" @click="removeFromCart(index)">Remove</button>
                            </li>
                        </ul>
                        <div class="mt-3 text-end">
                            <strong>Total: ${{ cartTotal }}</strong>
                            <router-link to="/payment" class="btn btn-success mt-3 w-100" @click.native="storeCart">
                                Proceed to Payment
                            </router-link>
                        </div>
                    </div>
                </div>
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
                                <label class="form-label">Materials</label>
                                <input v-model="newProject.materials" type="text" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Workers Needed</label>
                                <input v-model="newProject.tukangCount" type="number" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Duration (days)</label>
                                <input v-model="newProject.duration" type="number" class="form-control" required />
                            </div>
                            <button type="submit" class="btn btn-success w-100">Submit</button>
                        </form>
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
            showAddProject: false,
            showCart: false,
            searchTerm: '',
            newProject: {
                name: '',
                materials: '',
                tukangCount: 0,
                duration: 0
            },
            cart: [],
            projects: [
                { id: 1, name: 'Home Renovation', materials: 'Bricks, Cement', tukangCount: 3, duration: 14, status: 'Open' },
                { id: 2, name: 'Garden Setup', materials: 'Wood, Stones', tukangCount: 2, duration: 7, status: 'In Progress' }
            ],
            materials: [
                { id: 1, name: 'Cement Bag', description: '50kg high-quality cement', price: 5.99, image: '/assets/cement.jpg' },
                { id: 2, name: 'Bricks', description: 'Pack of 100 bricks', price: 9.99, image: '/assets/bricks.jpg' },
                { id: 3, name: 'Steel Rod', description: 'Strong support material', price: 15.99, image: '/assets/steel.jpg' }
            ]
        };
    },
    computed: {
        filteredMaterials() {
            return this.materials.filter((m) =>
                m.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
        cartTotal() {
            return this.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        }
    },
    mounted() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }
    },
    methods: {
        addProject() {
            const newId = this.projects.length + 1;
            this.projects.push({
                ...this.newProject,
                id: newId,
                status: 'Open'
            });
            this.showAddProject = false;
            this.newProject = { name: '', materials: '', tukangCount: 0, duration: 0 };
        },
        addToCart(material) {
            this.cart.push(material);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        storeCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
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
