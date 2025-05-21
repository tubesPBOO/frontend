<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center px-3 bg-light text-dark">
    <div class="card shadow p-4 w-100" style="max-width: 420px;">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="m-0">🔐 Login</h4>
      </div>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="inputName" class="form-label">Username</label>
          <input type="text" class="form-control" id="inputName"
            placeholder="Enter your name" v-model="name" required />
        </div>

        <div class="mb-3">
          <label for="inputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="inputPassword"
            placeholder="Enter your password" v-model="pass" required />
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>

        <div v-if="loginStatus" class="alert mt-3 mb-0"
          :class="loginStatus.startsWith('Login successful') ? 'alert-success' : 'alert-danger'">
          {{ loginStatus }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      pass: '',
      loginStatus: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: this.name, pass: this.pass }),
        });

        const text = await response.text();
        if (response.ok) {
          this.loginStatus = `Login successful! ${text}`;
          this.$emit('login-success');
        } else {
          this.loginStatus = `Login failed: ${text || 'Unknown error'}`;
        }
      } catch (error) {
        this.loginStatus = `Error: ${error.message}`;
      }
    },
  },
};
</script>

<style scoped>
.card {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
