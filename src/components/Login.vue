<template>
  <div class="signup-page">
    <div class="signup-overlay">
      <div class="signup-container d-flex">
        <!-- Left Side Image with Text -->
        <div class="signup-left text-white d-flex flex-column justify-content-end p-5">
          <div>
            <h2 class="fw-bold mb-3">Don’t have an account?</h2>
            <p class="mb-4">
              Register to access all the features of our service. Manage your trips and bookings in one place. It’s
              free!
            </p>
            <div class="social-icons">
              <i class="bi bi-instagram me-3"></i>
              <i class="bi bi-facebook me-3"></i>
              <i class="bi bi-telegram me-3"></i>
              <i class="bi bi-youtube me-3"></i>
              <i class="bi bi-pinterest"></i>
            </div>
          </div>
        </div>

        <!-- Right Side Form -->
        <div class="signup-right p-5">
          <h3 class="mb-4 text-white fw-semibold">Sign up</h3>

          <form @submit.prevent="signup">
            <!-- <div class="form-group mb-4">
              <input type="email" class="custom-input" placeholder="Email" v-model="email" required />
            </div> -->

            <div class="form-group mb-4">
              <input type="text" class="custom-input" placeholder="Username" v-model="username" required />
            </div>

            <div class="form-group mb-2 position-relative">
              <input :type="showPassword ? 'text' : 'password'" class="custom-input" placeholder="Password"
                v-model="password" required minlength="8" />
              <span class="toggle-password" @click="togglePassword">
                <i :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
              </span>
              <small class="text-muted">Must consist at least 8 symbols</small>
            </div>

            <div class="form-check my-3">
              <input class="form-check-input" type="checkbox" id="privacy" v-model="agree" />
              <label class="form-check-label text-white" for="privacy">
                I agree with <a href="#" class="text-decoration-underline">Privacy policy</a>
              </label>
            </div>

            <button type="submit" class="btn btn-light w-100 rounded-pill mb-3" :disabled="!agree">Sign up</button>

            <div class="text-center">
              <a href="#" class="text-white text-decoration-none">Have an account?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      showPassword: false,
      agree: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    signup() {
      if (this.agree) {
        alert(`Signed up with ${this.email}`);
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.signup-page {
  background: url('/bg-mount-fix.jpg') center/cover no-repeat;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.signup-overlay {
  backdrop-filter: blur(3px);
  background-color: rgba(0, 0, 0, 0.3);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-container {
  width: 100%;
  max-width: 1200px;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.signup-left {
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.signup-right {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.social-icons i {
  font-size: 20px;
  cursor: pointer;
}

.custom-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  color: #fff;
  width: 100%;
  padding: 0.5rem 0;
  outline: none;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.custom-input:focus {
  border-color: #fff;
  box-shadow: none;
}

.toggle-password {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ccc;
}
</style>
