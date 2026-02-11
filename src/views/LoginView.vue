<template>
  <div>
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
    </form>

    <p v-if="error" style="color:red">{{ error }}</p>

    <div style="margin-top:10px">
      <router-link to="/forgot-password">Forgot Password?</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    await authService.login(email.value, password.value)

    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
