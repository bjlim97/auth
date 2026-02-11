<template>
  <div class="container">
    <div class="card">
      <h2>Welcome Back 👋</h2>
      <p class="subtitle">Login to your account</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>

      <router-link to="/register" class="register-btn">
        Create an Account
      </router-link>

      <router-link to="/forgot-password" class="link">
        Forgot Password?
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";

const router = useRouter();
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";
    await authService.login(email.value, password.value);
    router.push("/dashboard");
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
}

.card {
  background: white;
  padding: 40px;
  width: 350px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  margin-top: 5px;
}

input:focus {
  outline: none;
  border-color: #4f46e5;
}

button {
  width: 100%;
  padding: 10px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #4338ca;
}

.error {
  color: red;
  margin-top: 10px;
}

.register-btn {
  display: block;
  margin-top: 15px;
  padding: 10px;
  background: white;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}

.register-btn:hover {
  background: #4f46e5;
  color: white;
}

.link {
  display: block;
  margin-top: 15px;
  color: #4f46e5;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
