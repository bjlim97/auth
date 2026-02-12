<template>
  <div class="container">
    <div class="card">
      <RegisterProgress :currentStep="3" />

      <h2>{{ t("createAccount") }}</h2>
      <p class="subtitle">{{ t("step3ConfirmDetails") }}</p>

      <div v-if="formData" class="summary">
        <div class="summary-item">
          <span>{{ t("email") }}</span>
          <strong>{{ formData.email }}</strong>
        </div>

        <div class="summary-item">
          <span>{{ t("name") }}</span>
          <strong>{{ formData.name }}</strong>
        </div>

        <div class="summary-item">
          <span>{{ t("phone") }}</span>
          <strong>{{ formData.phone }}</strong>
        </div>

        <div class="summary-item">
          <span>{{ t("address") }}</span>
          <strong>{{ formData.address }}</strong>
        </div>

        <div class="summary-item">
          <span>{{ t("age") }}</span>
          <strong>{{ formData.age }}</strong>
        </div>

        <div class="summary-item">
          <span>{{ t("gender") }}</span>
          <strong>{{ t(formData.gender as "male" | "female") }}</strong>
        </div>
      </div>

      <div class="button-group">
        <button class="secondary" @click="goBack">{{ t("back") }}</button>

        <button @click="handleRegister" :disabled="loading">
          {{ loading ? t("registering") : t("confirmRegister") }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">
        {{ t("registrationSuccess") }}
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
import { t } from "../../services/i18n";

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
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--card-bg);
  padding: 40px;
  width: 420px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.subtitle {
  color: var(--text-muted);
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
  border-bottom: 1px solid var(--border);
}

.summary-item span {
  color: var(--text-muted);
}

.summary-item strong {
  color: var(--text);
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
}

/* Primary */
button:not(.secondary) {
  background: var(--primary);
  color: white;
}

button:not(.secondary):hover:not(:disabled) {
  background: var(--primary-hover);
}

/* Secondary */
.secondary {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

.secondary:hover {
  background: var(--primary);
  color: white;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #ef4444;
  margin-top: 15px;
}

.success {
  margin-top: 15px;
  padding: 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 6px;
  color: #10b981;
}
</style>
