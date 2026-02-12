<template>
  <div class="container">
    <div class="card">
      <h2>{{ t("welcomeBackTitle") }}</h2>
      <p class="subtitle">{{ t("loginSubtitle") }}</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>{{ t("email") }}</label>
          <input v-model="email" type="email" required />
        </div>

        <div class="form-group">
          <label>{{ t("password") }}</label>
          <input v-model="password" type="password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? t("loggingIn") : t("login") }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>

      <router-link to="/register" class="register-btn">
        {{ t("createAccount") }}
      </router-link>

      <router-link to="/forgot-password" class="link">
        {{ t("forgotPassword") }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";
import { t } from "../services/i18n";

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
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--card-bg);
  padding: 40px;
  width: 350px;
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

.register-btn {
  display: block;
  margin-top: 15px;
  padding: 10px;
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}

.register-btn:hover {
  background: var(--primary);
  color: white;
}

.link {
  display: block;
  margin-top: 15px;
  color: var(--primary);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
