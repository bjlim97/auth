<template>
  <div class="container">
    <div class="card">
      <h2>Dashboard</h2>
      <p class="subtitle">Welcome back 👋</p>

      <div v-if="user" class="profile-box">
        <div class="profile-item">
          <span>Name</span>
          <strong>{{ user.name }}</strong>
        </div>

        <div class="profile-item">
          <span>Email</span>
          <strong>{{ user.email }}</strong>
        </div>
      </div>

      <div class="button-group">
        <button class="secondary" @click="goToUpdate">Update Profile</button>

        <button class="danger" @click="handleLogout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";
import type { User } from "../types/User";

const router = useRouter();
const user = ref<User | null>(null);

onMounted(() => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser) {
    router.push("/login");
    return;
  }

  user.value = currentUser;
});

const handleLogout = () => {
  authService.logout();
  router.push("/login");
};

const goToUpdate = () => {
  router.push("/update-profile");
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

.profile-box {
  text-align: left;
  margin-bottom: 25px;
}

.profile-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.profile-item span {
  color: #6b7280;
}

.profile-item strong {
  color: #111827;
}

.button-group {
  display: flex;
  gap: 10px;
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

.secondary {
  background: white;
  border: 2px solid #4f46e5;
  color: #4f46e5;
}

.secondary:hover {
  background: #4f46e5;
  color: white;
}

.danger {
  background: #ef4444;
  color: white;
}

.danger:hover {
  background: #dc2626;
}
</style>
