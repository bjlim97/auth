<template>
  <div>
    <h2>Reset Password</h2>

    <form @submit.prevent="handleSubmit">
      <input
        v-model="newPassword"
        type="password"
        placeholder="New Password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Resetting...' : 'Reset Password' }}
      </button>
    </form>

    <p v-if="success" style="color:green">
      Password reset successful!
    </p>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '../services/authService'

const route = useRoute()
const router = useRouter()

const newPassword = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref('')

const handleSubmit = async () => {
  const email = route.query.email as string

  if (!email) {
    error.value = 'Invalid reset link'
    return
  }

  try {
    loading.value = true
    error.value = ''

    await authService.resetPassword(email, newPassword.value)

    success.value = true

    setTimeout(() => {
      router.push('/login')
    }, 1500)

  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
