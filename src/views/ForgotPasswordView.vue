<template>
  <div class="container">
    <div class="card">
      <h2>Forgot Password</h2>
      <p class="subtitle">Enter your email to reset your password</p>

      <form @submit.prevent="handleReset">
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Processing..." : "Reset Password" }}
        </button>
      </form>

      <div v-if="message" class="success-box">
        <p>{{ message }}</p>
        <router-link class="reset-link" :to="`/reset-password?email=${email}`">
          Click here to reset password
        </router-link>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <router-link to="/login" class="back-link"> Back to Login </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const loading = ref(false);
const message = ref("");
const error = ref("");

const handleReset = async () => {
  loading.value = true;
  error.value = "";
  message.value = "";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.find((u: any) => u.email === email.value);

  if (!exists) {
    error.value = "Email not found";
  } else {
    message.value = "Reset link generated successfully.";
  }

  loading.value = false;
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--card-bg);
  padding: 40px;
  width: 380px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.subtitle {
  color: var(--text-muted);
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
  border: 1px solid var(--border);
  margin-top: 5px;
  background: var(--input-bg);
  color: var(--text);
}

input:focus {
  outline: none;
  border-color: var(--primary);
}

button {
  width: 100%;
  padding: 10px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 600;
}

button:hover:not(:disabled) {
  background: var(--primary-hover);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-box {
  margin-top: 15px;
  padding: 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 6px;
  color: #10b981;
}

.reset-link {
  display: inline-block;
  margin-top: 8px;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.reset-link:hover {
  text-decoration: underline;
}

.error {
  color: #ef4444;
  margin-top: 15px;
}

.back-link {
  display: block;
  margin-top: 15px;
  color: var(--primary);
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
