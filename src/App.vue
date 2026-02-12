<template>
  <div>
    <AppBar
      :user="currentUser"
      @profile="goToUpdate"
      @logout="handleLogout"
    />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppBar from "./components/AppBar.vue";
import { authService } from "./services/authService";
import type { User } from "./types/User";

const router = useRouter();

/* Reactive current user */
const currentUser = computed<User | null>(() => {
  return authService.getCurrentUser();
});

const handleLogout = () => {
  authService.logout();
  router.push("/login");
};

const goToUpdate = () => {
  router.push("/update-profile");
};
</script>
