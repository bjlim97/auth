<template>
  <div class="container">
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
  border: 1px solid #d1d5db;
  margin-top: 5px;
  transition: 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4f46e5;
}

.button-group {
  margin-top: 20px;
}

button {
  width: 100%;
  padding: 10px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
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
  margin-top: 15px;
}

.success {
  margin-top: 15px;
  padding: 12px;
  background: #f0fdf4;
  border: 1px solid #16a34a;
  border-radius: 6px;
  color: #166534;
}
</style>
