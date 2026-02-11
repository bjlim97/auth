<template>
  <div class="container">
    <div class="card">
      <RegisterProgress :currentStep="1" />

      <h2>Create Account</h2>
      <p class="subtitle">Step 1: Account Details</p>

      <form @submit.prevent="handleNext">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Processing..." : "Next" }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>

      <router-link to="/login" class="back-link">
        Already have an account? Login
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegisterProgress from "../../components/RegisterProgress.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleNext = async () => {
  try {
    loading.value = true;
    error.value = "";
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem(
      "registerStep1",
      JSON.stringify({ email: email.value, password: password.value }),
    );

    router.push("/register/step-2");
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
}

.card {
  background: white;
  padding: 40px;
  width: 380px;
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
  transition: 0.2s;
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
  transition: 0.3s;
}

button:hover:not(:disabled) {
  background: #4338ca;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}

.back-link {
  display: block;
  margin-top: 15px;
  color: #4f46e5;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
