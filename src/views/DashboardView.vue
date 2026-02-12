<template>
  <div class="dashboard">
    <AppBar :user="user" @profile="goToUpdate" @logout="handleLogout" />

    <main class="content">
      <h1>Dashboard</h1>
      <p>Welcome back, {{ user?.name }}</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";
import type { User } from "../types/User";
import AppBar from "../components/AppBar.vue";

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

.dashboard {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.content {
  padding: 40px;
}
</style>
