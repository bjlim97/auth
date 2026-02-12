<template>
  <div class="dashboard">
    <main class="content">
      <div class="card">
        <h2>Update Profile</h2>
        <p class="subtitle">Edit your personal information</p>

        <form v-if="form" @submit.prevent="handleUpdate">
          <div class="form-group">
            <label>Name</label>
            <input v-model="form.name" required />
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input v-model="form.phone" required />
          </div>

          <div class="form-group">
            <label>Address</label>
            <input v-model="form.address" required />
          </div>

          <div class="form-group">
            <label>Age</label>
            <input v-model.number="form.age" type="number" required />
          </div>

          <div class="form-group">
            <label>Gender</label>
            <select v-model="form.gender" required>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div class="button-group">
            <button type="submit" :disabled="loading">
              {{ loading ? "Updating..." : "Update Profile" }}
            </button>
          </div>
        </form>

        <p v-if="error" class="error">{{ error }}</p>

        <p v-if="success" class="success">
          Profile Updated Successfully! Redirecting...
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";
import type { User } from "../types/User";

const router = useRouter();
const form = ref<User | null>(null);
const loading = ref(false);
const error = ref("");
const success = ref(false);

onMounted(() => {
  const user = authService.getCurrentUser();

  if (!user) {
    router.push("/login");
    return;
  }

  form.value = { ...user };
});

const handleLogout = () => {
  authService.logout();
  router.push("/login");
};

const handleUpdate = async () => {
  if (!form.value) return;

  try {
    loading.value = true;
    error.value = "";
    success.value = false;

    await authService.updateProfile(form.value);

    success.value = true;

    setTimeout(() => {
      router.push("/dashboard");
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

.dashboard {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.content {
  padding: 40px;
  display: flex;
  justify-content: center;
}

.card {
  background: var(--card-bg);
  color: var(--text);
  border-radius: 12px;
  padding: 40px;
  width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.subtitle {
  color: var(--text-muted);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--input-bg);
  color: var(--text);
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary);
}

.button-group {
  margin-top: 20px;
}

button {
  width: 100%;
  padding: 10px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
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
