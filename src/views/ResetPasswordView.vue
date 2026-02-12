<template>
  <div class="container">
    <div class="card">
      <h2>{{ t("resetPasswordTitle") }}</h2>
      <p class="subtitle">{{ t("resetPasswordSubtitle") }}</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>{{ t("newPassword") }}</label>
          <input
            v-model="newPassword"
            type="password"
            :placeholder="t('newPasswordPlaceholder')"
            required
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? t("resetting") : t("resetPassword") }}
        </button>
      </form>

      <p v-if="success" class="success">
        {{ t("passwordResetSuccess") }}
      </p>

      <p v-if="error" class="error">{{ t("invalidResetLink") }}</p>

      <router-link to="/login" class="back-link"> {{ t("backToLogin") }} </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authService } from "../services/authService";
import { t } from "../services/i18n";

const route = useRoute();
const router = useRouter();

const newPassword = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref("");

const handleSubmit = async () => {
  const email = route.query.email as string;

  if (!email) {
    error.value = "Invalid reset link";
    return;
  }

  try {
    loading.value = true;
    error.value = "";

    await authService.resetPassword(email, newPassword.value);

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

.success {
  margin-top: 15px;
  padding: 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 6px;
  color: #10b981;
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
