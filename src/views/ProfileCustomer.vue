<template>
    <div style="background-color: #F5F5F5;">
        <!-- NAVBAR -->
        <nav class="navbar navbar-expand-lg navbar-white bg-white px-4 py-3 fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand fw-bold text-warning" href="#">
                    <span class="text-dark">Tukang.In</span>
                </a>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#">PROFILE</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="$router.push('/dashboard')">DASHBOARD</a>
                    </li>
                </ul>
            </div>
        </nav>

        <!-- PROFILE SECTION -->
        <section class="container-md mt-5 pt-5 pb-5">
            <h2 class="fw-semibold mb-4">My Profile</h2>

            <!-- Alert Messages -->
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <!-- Profile Form -->
            <form @submit.prevent="updateProfile" class="bg-white p-4 rounded shadow-sm">
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Full Name</label>
                        <input v-model="profile.name" type="text" class="form-control" required />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Email</label>
                        <input v-model="profile.email" type="email" class="form-control" readonly disabled />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Phone Number</label>
                        <input v-model="profile.phoneNumber" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Address</label>
                        <input v-model="profile.address" type="text" class="form-control" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">New Password</label>
                        <input v-model="profile.password" type="password" class="form-control"
                            placeholder="Leave blank to keep current password" />
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Confirm New Password</label>
                        <input v-model="profile.confirmPassword" type="password" class="form-control" />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mt-4 w-100" :disabled="loadingUpdate">
                    <span v-if="loadingUpdate">
                        <div class="loader-spanne-20 d-inline-block me-2" style="transform: scale(0.7);"></div>
                        Updating...
                    </span>
                    <span v-else>Update Profile</span>
                </button>
            </form>

            <!-- DELETE ACCOUNT SECTION -->
            <div class="mt-5 bg-white p-4 rounded shadow-sm">
                <h4 class="fw-semibold mb-3 text-danger">Delete Account</h4>
                <p class="text-muted mb-3">
                    Deleting your account will remove all your data permanently. This action cannot be undone.
                </p>
                <button class="btn btn-outline-danger" @click="showDeleteModal = true">Delete My Account</button>
            </div>
        </section>

        <!-- CONFIRMATION MODAL -->
        <div v-if="showDeleteModal" class="modal d-block" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">Confirm Account Deletion</h5>
                        <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <p class="text-danger fw-bold">Are you sure you want to delete your account?</p>
                        <p>This action cannot be undone. All your projects, cart data, and personal information will be
                            removed permanently.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
                        <button class="btn btn-danger" :disabled="deleting" @click="deleteAccount">
                            <span v-if="deleting">
                                <div class="loader-spanne-20 d-inline-block me-2" style="transform: scale(0.7);"></div>
                                Deleting...
                            </span>
                            <span v-else>Delete Account</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- LOADER OVERLAY -->
        <div v-if="deleting || loadingUpdate" class="fullscreen-loader">
            <div class="loader-spanne-20">
                <span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProfileCustomer",
    data() {
        return {
            profile: {
                name: "",
                email: "",
                phoneNumber: "",
                address: "",
                password: "",
                confirmPassword: "",
            },
            showDeleteModal: false,
            deleting: false,
            loadingUpdate: false,
            successMessage: "",
            errorMessage: "",
        };
    },
    mounted() {
        this.fetchProfile();
    },
    methods: {
        async fetchProfile() {
            try {
                const response = await fetch("http://localhost:8080/api/customers/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile.");
                }

                const data = await response.json();
                this.profile.name = data.name;
                this.profile.email = data.email;
                this.profile.phoneNumber = data.phoneNumber || "";
                this.profile.address = data.address || "";
            } catch (error) {
                console.error("Error fetching profile:", error);
                this.errorMessage = "Failed to load profile.";
            }
        },

        async updateProfile() {
            this.loadingUpdate = true;
            this.successMessage = "";
            this.errorMessage = "";

            if (this.profile.password !== this.profile.confirmPassword) {
                this.errorMessage = "Passwords do not match.";
                this.loadingUpdate = false;
                return;
            }

            const payload = {
                name: this.profile.name,
                email: this.profile.email,
                phoneNumber: this.profile.phoneNumber,
                address: this.profile.address,
                password: this.profile.password || undefined,
            };

            try {
                const response = await fetch("http://localhost:8080/api/customers/updateProfile", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || "Failed to update profile.");
                }

                this.successMessage = "Profile updated successfully!";
                this.profile.password = "";
                this.profile.confirmPassword = "";
            } catch (error) {
                this.errorMessage = error.message;
            } finally {
                this.loadingUpdate = false;
            }
        },

        async deleteAccount() {
            this.deleting = true;
            this.errorMessage = "";

            try {
                const response = await fetch("http://localhost:8080/api/customers/deleteAccount", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || "Failed to delete account.");
                }

                localStorage.removeItem('cart');
                this.showDeleteModal = false;

                alert("✅ Your account has been deleted.");
                this.$router.push("/");
                window.location.reload(); // Ensure state reset
            } catch (error) {
                this.errorMessage = error.message;
            } finally {
                this.deleting = false;
            }
        },
    },
};
</script>

<style scoped>
/* Fullscreen Loader Overlay */
.fullscreen-loader {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    /* Ensure it's above other elements */
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    /* Semi-transparent black overlay */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Loader Animation */
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
    /* Light blue-green color */
    display: block;
    border-radius: 3px;
    transform-origin: 50% 100%;
    animation: move 2.8s linear infinite;
}

/* Keyframes for the loader animation */
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
</style>