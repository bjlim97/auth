<template>
  <div>
    <h2>Register - Step 1</h2>

    <form @submit.prevent="handleNext">
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>

      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Next' }}
      </button>
    </form>

    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleNext = async () => {
  try {
    loading.value = true
    error.value = ''

    await new Promise(resolve => setTimeout(resolve, 1000))

    // temporarily store step1 data
    localStorage.setItem(
      'registerStep1',
      JSON.stringify({ email: email.value, password: password.value })
    )

    router.push('/register/step-2')
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
