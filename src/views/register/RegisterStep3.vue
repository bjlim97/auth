<template>
  <div class="container">
    <div class="card">
      <RegisterProgress :currentStep="3" />

      <h2>Create Account</h2>
      <p class="subtitle">Step 3: Confirm Your Details</p>

      <div v-if="formData" class="summary">
        <div class="summary-item">
          <span>Email</span>
          <strong>{{ formData.email }}</strong>
        </div>

        <div class="summary-item">
          <span>Name</span>
          <strong>{{ formData.name }}</strong>
        </div>

        <div class="summary-item">
          <span>Phone</span>
          <strong>{{ formData.phone }}</strong>
        </div>

        <div class="summary-item">
          <span>Address</span>
          <strong>{{ formData.address }}</strong>
        </div>

        <div class="summary-item">
          <span>Age</span>
          <strong>{{ formData.age }}</strong>
        </div>

        <div class="summary-item">
          <span>Gender</span>
          <strong>{{ formData.gender }}</strong>
        </div>
      </div>

      <div class="button-group">
        <button class="secondary" @click="goBack">Back</button>

        <button @click="handleRegister" :disabled="loading">
          {{ loading ? "Registering..." : "Confirm & Register" }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">
        Registration Successful! Redirecting...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../../services/authService";
import type { User } from "../../types/User";
import RegisterProgress from "../../components/RegisterProgress.vue";

const router = useRouter();
const formData = ref<User | null>(null);
const loading = ref(false);
const error = ref("");
const success = ref(false);

onMounted(() => {
  const step1 = JSON.parse(localStorage.getItem("registerStep1") || "null");
  const step2 = JSON.parse(localStorage.getItem("registerStep2") || "null");

  if (!step1 || !step2) {
    router.push("/register");
    return;
  }

  formData.value = { ...step1, ...step2 };
});

const goBack = () => {
  router.push("/register/step-2");
};

const handleRegister = async () => {
  if (!formData.value) return;

  try {
    loading.value = true;
    error.value = "";

    await authService.register(formData.value);

    localStorage.removeItem("registerStep1");
    localStorage.removeItem("registerStep2");

    success.value = true;

    setTimeout(() => {
      router.push("/login");
    }, 1500);
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
  width: 420px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 25px;
}

.summary {
  text-align: left;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.summary-item span {
  color: #6b7280;
}

.summary-item strong {
  color: #111827;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

button:not(.secondary) {
  background: #4f46e5;
  color: white;
}

button:not(.secondary):hover:not(:disabled) {
  background: #4338ca;
}

.secondary {
  background: white;
  border: 2px solid #4f46e5;
  color: #4f46e5;
}

.secondary:hover {
  background: #4f46e5;
  color: white;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 15px;
}

.success {
  color: #16a34a;
  margin-top: 15px;
}
</style>
