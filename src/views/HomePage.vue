<template>
    <div style="background-color: #f8f9fa;">
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-lg navbar-white bg-white px-4 py-3 fixed-top shadow-sm">
            <div class="container-fluid">
                <!-- Logo -->
                <a class="navbar-brand fw-bold text-warning" href="#">
                    <span class="text-dark">Tukang.In</span>
                </a>

                <!-- Hamburger Button -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navbar Items -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
                        <li class="nav-item">
                            <a class="nav-link fw-semibold" href="#projectt">PROJECTS</a>
                        </li>

                        <li class="nav-item position-relative">
                            <!-- Cart Text -->
                            <a class="nav-link fw-semibold position-relative" href="#" title="Cart"
                                @click="showCart = true">
                                CART
                                <span
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style="font-size: 0.7rem;">
                                    {{ cart.length }}
                                </span>
                            </a>
                        </li>

                        <li class="nav-item">
                            <router-link to="/customer/profile" class="nav-link">
                                <i class="fas fa-user fa-lg"></i>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- HERO SECTION -->
        <header class="hero-section text-center text-white d-flex align-items-center justify-content-center">
            <div>
                <h1 class="display-4 fw-bold">
                    IN JAWA<br />WE TRUST
                </h1>
                <p class="lead mt-3">"JAWA JAWA JAWA"</p>
            </div>
        </header>

        <div class="container py-5">
            <!-- My Projects -->
            <div class="mb-5">
                <!-- Header Section with the 'My Projects' title and Add Project Button aligned -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="fw-semibold" style="color: black;">My Projects</h4>
                    <button class="btn btn-primary" @click="showAddProject = true">Add Project</button>
                </div>

                <!-- Add Project Modal -->
                <div v-if="showAddProject && !loading" class="modal d-block" tabindex="-1" role="dialog">
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
                                        <input v-model="newProject.jumTukang" type="number" class="form-control"
                                            required />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Duration (days)</label>
                                        <input v-model="newProject.durasi" type="number" class="form-control"
                                            required />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">Description</label>
                                        <textarea v-model="newProject.deskripsi" class="form-control"
                                            required></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label">City</label>
                                        <input v-model="newProject.alamatKota" type="text" class="form-control"
                                            required />
                                    </div>

                                    <button type="submit" class="btn btn-success w-100">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fullscreen Loading Overlay -->
                <div v-if="loading" class="fullscreen-loader">
                    <div class="loader-spanne-20">
                        <span></span><span></span><span></span>
                        <span></span><span></span><span></span><span></span>
                    </div>
                </div>

                <div v-if="projects.length > 0" class="row row-cols-1 row-cols-md-2 g-4">
                    <div v-for="project in projects" :key="project.id" class="col" id="projectt">
                        <div class="card shadow-sm position-relative h-100 overflow-hidden"
                            @mouseover="hoveredProject = project" @mouseleave="hoveredProject = null">
                            <!-- Project Image -->
                            <img :src="'/images/my-project.jpg'" alt="Project Image" class="card-img-top img-fluid"
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
                <h4 class="fw-semibold mb-3" style="color: black;">Available Materials</h4>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div v-for="(material, index) in filteredMaterials.slice(0, showAllMaterials ? filteredMaterials.length : materialsToShow)"
                        :key="material.id" class="col">
                        <div class="card h-100 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title">{{ material.name }}</h5>
                                <p class="card-text">{{ material.description }}</p>
                                <p class="fw-bold">Rp{{ material.price.toLocaleString('id-ID') }}</p>
                                <!-- Input rating -->
                                <input type="number" class="form-control mb-2" min="1" max="5" step="0.5"
                                    v-model.number="ratingInputs[material.name]" placeholder="Masukkan rating (1–5)" />
                                <!-- Tombol submit rating -->
                                <button class="btn btn-success w-100 mb-2"
                                    @click="addRatingToMaterial(material.name, ratingInputs[material.name])">
                                    Submit Rating
                                </button>
                                <button class="CartBtn w-100 d-flex align-items-center justify-content-center gap-2"
                                    @click="addToCart(material)">
                                    <span class="fw-bold">Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Show "Show All" Button if there are more materials than shown -->
                <div class="text-center mt-4" v-if="filteredMaterials.length > materialsToShow && !showAllMaterials">
                    <button class="btn btn-outline-primary" @click="showAllMaterials = true">
                        Show All {{ filteredMaterials.length }} Materials
                    </button>
                </div>

                <!-- Optionally show a "Show Less" button when expanded -->
                <div class="text-center mt-4" v-if="showAllMaterials">
                    <button class="btn btn-outline-secondary" @click="showAllMaterials = false">
                        Show Less
                    </button>
                </div>
            </div>

            <!-- Cart Modal -->
            <div v-if="showCart && !isPaying" class="modal d-block" tabindex="-1">
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
                                <button class="btn btn-success mt-3 w-100" @click="proceedToPayment"
                                    :disabled="isPaying">
                                    <span v-if="isPaying">
                                        <div class="loader-spanne-20 d-inline-block me-2"
                                            style="transform: scale(0.7);"></div>
                                        Processing...
                                    </span>
                                    <span v-else>
                                        Proceed to Payment
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fullscreen Loader Overlay -->
            <div v-if="isPaying" class="fullscreen-loader">
                <div class="loader-spanne-20">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span><span></span>
                </div>
            </div>

        </div>
        <footer class="footer-section bg-footer text-dark py-5">
            <div class="container">
                <div class="row gy-4">

                    <!-- Shop -->
                    <div class="col-md-3">
                        <h6 class="fw-bold mb-3">Shop</h6>
                        <ul class="list-unstyled">
                            <li>All</li>
                            <li>Home & Living</li>
                            <li>Accessories</li>
                            <li>Stationery</li>
                            <li>Sale</li>
                            <li>Gift Card</li>
                        </ul>
                    </div>

                    <!-- Helpful Links -->
                    <div class="col-md-3">
                        <h6 class="fw-bold mb-3">Helpful Links</h6>
                        <ul class="list-unstyled">
                            <li>FAQ</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Shipping Policy</li>
                            <li>Refund Policy</li>
                            <li>Cookie Policy</li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div class="col-md-3">
                        <h6 class="fw-bold mb-3">Contact</h6>
                        <p class="mb-1">tukang-in@mysite.com</p>
                        <p class="mb-1">123-456-7890</p>
                        <p class="mb-3">Suwardi Base Camp,<br />Bandung, Indonesia</p>
                        <div class="d-flex gap-3">
                            <i class="bi bi-instagram"></i>
                            <i class="bi bi-facebook"></i>
                            <i class="bi bi-tiktok"></i>
                        </div>
                    </div>

                    <!-- Subscribe -->
                    <div class="col-md-3">
                        <h6 class="fw-bold mb-3">Subscribe</h6>
                        <p>Subscribe to our newsletter and be among the first to hear about new arrivals, events and
                            special offers.</p>
                        <input type="email" class="form-control mb-2 rounded-pill px-3" placeholder="Email *" />
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="subscribeCheck" />
                            <label class="form-check-label" for="subscribeCheck">
                                Yes, subscribe me to your newsletter.
                            </label>
                        </div>
                        <button class="btn btn-dark rounded-pill px-4">Subscribe</button>
                    </div>
                </div>

                <!-- Copyright -->
                <div class="text-center mt-5 small">
                    © 2035 by Kelompok 4. Powered and secured by <a href="#" class="text-decoration-underline">4</a>
                </div>
            </div>
        </footer>
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
            loading: false,
            searchTerm: '',
            newProject: {
                name: '',
                materials: '',
                tukangCount: 0,
                duration: 0,
            },
            cart: [],
            isPaying: false,
            hoveredProject: null,
            searchTerm: '',
            materials: [],
            showCart: false,
            materialsToShow: 3,
            showAllMaterials: false,
            ratingInputs: {},
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
            this.loading = true; // start loading

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
                console.log('✅ Server response:', resultText);
                alert('✅ ' + resultText);

                // Reset form dan tutup modal
                this.newProject = {
                    name: '',
                    deskripsi: '',
                    alamatKota: '',
                    durasi: 0,
                    jumTukang: 0,
                    listTukang: [],
                    status: 'Looking for Tukang'
                };
                this.showAddProject = false;

                // Optional: refresh project list
                if (this.fetchMyProjects) await this.fetchMyProjects();

            } catch (error) {
                console.error('❌ Error adding project:', error);
                alert('❌ Failed to add project: ' + error.message);
            } finally {
                this.loading = false; // stop loading
            }
        },
        async addRatingToMaterial(name, ratingValue) {
            try {
                const res = await fetch(`http://localhost:8080/api/customers/rating/materials/${encodeURIComponent(name)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        totrating: ratingValue,
                    }),
                });

                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(`Gagal tambah rating: ${errText}`);
                }

                const message = await res.text();
                alert(`✅ ${message}`);

                // Opsional: Refresh data rating/material
                await this.fetchMaterials();
                await this.fetchAllRatings?.();

            } catch (err) {
                console.error('❌ Error saat add rating:', err);
                alert(err.message);
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
                    description: `Stock: ${mat.stock} | Rating: ${mat.totrating / 10} (${mat.ratingCount} reviews)`,
                }));
            } catch (err) {
                console.error('Fetch error:', err);
            }
        },
        async proceedToPayment() {
            this.isPaying = true;
            try {
                const materialsOnly = this.cart.map(item => ({ name: item.name }));
                console.log("🟢 Sending materials:", materialsOnly);

                const res = await fetch("http://localhost:8080/api/customers/order", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ materials: materialsOnly }),
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText);
                }

                await new Promise(resolve => setTimeout(resolve, 1500));
                this.showCart = false;

                this.$router.push('/payment');

            } catch (e) {
                console.error('❌ Error in proceedToPayment:', e);
                alert('❌ Gagal lanjut ke pembayaran: ' + e.message);
            } finally {
                this.isPaying = false;
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
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }

        this.fetchMyProjects();
        this.fetchMaterials();
        this.loadCart();
        localStorage.removeItem("cart");
    },
};
</script>

<style scoped>
.navbar,
.hero-section,
.container {
    font-family: 'Poppins', sans-serif;
}

.navbar-brand {
    font-family: 'MuseoModerno', sans-serif;
    font-size: 1.2rem;
}

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
    background: url('/images/Nordwood.jpg') center/cover no-repeat;
    padding-top: 80px;
}

nav.navbar {
    z-index: 1000;
}

.fullscreen-loader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100vw;
    height: 100vh;
    background-color: rgba(20, 20, 20, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-spanne-20 {
    position: relative;
    width: 100px;
    height: 30px;
    padding: 0;
}

.loader-spanne-20>span {
    position: absolute;
    right: 0;
    width: 3px;
    height: 30px;
    background-color: rgb(116, 204, 197);
    display: block;
    border-radius: 3px;
    transform-origin: 50% 100%;
    animation: move 2.8s linear infinite;
}

.loader-spanne-20>span:nth-child(1) {
    animation-delay: -0.4s;
}

.loader-spanne-20>span:nth-child(2) {
    animation-delay: -0.8s;
}

.loader-spanne-20>span:nth-child(3) {
    animation-delay: -1.2s;
}

.loader-spanne-20>span:nth-child(4) {
    animation-delay: -1.6s;
}

.loader-spanne-20>span:nth-child(5) {
    animation-delay: -2s;
}

.loader-spanne-20>span:nth-child(6) {
    animation-delay: -2.4s;
}

.loader-spanne-20>span:nth-child(7) {
    animation-delay: -2.8s;
}

@keyframes move {
    0% {
        opacity: 0;
        transform: translateX(0px) rotate(0deg);
    }

    20% {
        opacity: 1;
    }

    40% {
        transform: translateX(-40px) rotate(0deg);
    }

    50% {
        opacity: 1;
        transform: translateX(-50px) rotate(22deg);
    }

    85% {
        opacity: 1;
        transform: translateX(-85px) rotate(60deg);
    }

    100% {
        opacity: 0;
        transform: translateX(-100px) rotate(65deg);
    }
}

.bg-footer {
    background-color: #f5e7b5 !important;
    /* Cream color */
    color: #000 !important;
    /* Biar teksnya nggak ikutan gelap */
}

.bg-footer .form-check {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.bg-footer a {
    color: #000;
}

.bg-footer .form-check-label {
    background-color: transparent !important;
    display: inline !important;
    padding: 0 !important;
    margin: 0 !important;
    color: #000 !important;
    /* opsional, pastikan teksnya tetap terbaca */
}

/* From Uiverse.io by vinodjangid07 */
.CartBtn {
    width: 100%;
    height: 40px;
    border-radius: 12px;
    border: none;
    background-color: rgb(255, 208, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-duration: 0.5s;
    overflow: hidden;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.103);
    position: relative;
}

.IconContainer {
    position: absolute;
    left: -50px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 2;
    transition-duration: 0.5s;
}

.text {
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(17, 17, 17);
    z-index: 1;
    transition-duration: 0.5s;
    font-size: 1.04em;
    font-weight: 600;
}

.CartBtn:hover .IconContainer {
    transform: translateX(58px);
    border-radius: 40px;
    transition-duration: 0.5s;
}

.CartBtn:hover .text {
    transform: translate(10px, 0px);
    transition-duration: 0.5s;
}

.CartBtn:active {
    transform: scale(0.95);
    transition-duration: 0.5s;
}
</style>