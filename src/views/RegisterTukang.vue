<template>
    <div class="container mt-5">
        <h2 class="mb-4">Register Tukang</h2>
        <div v-if="message" :class="['alert', isError ? 'alert-danger' : 'alert-success']">
            {{ message }}
        </div>
        <form @submit.prevent="registerTukang">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input v-model="form.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Password</label>
                <input v-model="form.password" type="password" class="form-control" required />
            </div>
            <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input v-model="form.phoneNumber" type="text" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterTukang',
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                role: 'ROLE_TUKANG',
                availability: true,
                phoneNumber: '',
                totrating: 0.0,
                ratingCount: 0
            },
            message: '',
            isError: false
        };
    },
    methods: {
        async registerTukang() {
            try {
                const res = await fetch('http://localhost:8080/api/tukang/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.form)
                });

                if (!res.ok) {
                    const errText = await res.text();
                    this.message = `Registration failed: ${errText}`;
                    this.isError = true;
                } else {
                    this.message = 'Registration successful! Redirecting to login...';
                    this.isError = false;
                    setTimeout(() => this.$router.push('/login'), 2000);
                }
            } catch (err) {
                this.message = `Error: ${err.message}`;
                this.isError = true;
            }
        }
    }
};
</script>
