<template>
  <div class="container">
    <div class="card">
      <RegisterProgress :currentStep="1" />

      <h2>{{ t("createAccount") }}</h2>
      <p class="subtitle">{{ t("step1Title") }}</p>

      <form @submit.prevent="handleNext">
        <div class="form-group">
          <label>{{ t("email") }}</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>{{ t("password") }}</label>
          <input v-model="password" type="password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? t("processing") : t("next") }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>

      <router-link to="/login" class="back-link">
        {{ t("alreadyHaveAccount") }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import RegisterProgress from "../../components/RegisterProgress.vue";
import { t } from "../../services/i18n";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

onMounted(() => {
  const savedStep1 = JSON.parse(
    localStorage.getItem("registerStep1") || "null",
  );

  if (savedStep1) {
    email.value = savedStep1.email;
    password.value = savedStep1.password;
  }
});

const handleNext = async () => {
  try {
    loading.value = true;
    error.value = "";

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u: any) => u.email === email.value);

    if (exists) {
      throw new Error(t("emailAlreadyRegistered"));
    }

    // Save step 1 data
    localStorage.setItem(
      "registerStep1",
      JSON.stringify({
        email: email.value,
        password: password.value,
      }),
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
}

button:hover:not(:disabled) {
  background: var(--primary-hover);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #ef4444;
  margin-top: 10px;
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
