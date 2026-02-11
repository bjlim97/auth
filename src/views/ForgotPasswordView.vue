<template>
  <div>
    <h2>Forgot Password</h2>

    <form @submit.prevent="handleReset">
      <input v-model="email" type="email" placeholder="Enter your email" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Processing...' : 'Reset Password' }}
      </button>
    </form>

    <p v-if="message" style="color:green">
      {{ message }}
      <br />
      <router-link
        :to="`/reset-password?email=${email}`">
        Click here to reset password
      </router-link>
    </p>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

const handleReset = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  await new Promise(resolve => setTimeout(resolve, 1000))

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const exists = users.find((u: any) => u.email === email.value)

  if (!exists) {
    error.value = 'Email not found'
  } else {
    message.value = 'Reset link generated successfully.'
  }

  loading.value = false
}
</script>
