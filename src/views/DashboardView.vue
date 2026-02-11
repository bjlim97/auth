<template>
  <div>
    <h2>Dashboard</h2>

    <div v-if="user">
      <p>Welcome, {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>

    <div style="margin-top:10px">
      <button @click="goToUpdate">Update Profile</button>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'
import type { User } from '../types/User'

const router = useRouter()
const user = ref<User | null>(null)

onMounted(() => {
  const currentUser = authService.getCurrentUser()
  if (!currentUser) {
    router.push('/login')
    return
  }

  user.value = currentUser
})

const handleLogout = () => {
  authService.logout()
  router.push('/login')
}

const goToUpdate = () => {
  router.push('/update-profile')
}
</script>
