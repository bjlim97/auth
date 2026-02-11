<template>
  <div>
    <h2>Register - Step 3 (Summary)</h2>

    <div v-if="formData">
      <p><strong>Email:</strong> {{ formData.email }}</p>
      <p><strong>Name:</strong> {{ formData.name }}</p>
      <p><strong>Phone:</strong> {{ formData.phone }}</p>
      <p><strong>Address:</strong> {{ formData.address }}</p>
      <p><strong>Age:</strong> {{ formData.age }}</p>
      <p><strong>Gender:</strong> {{ formData.gender }}</p>
    </div>

    <div style="margin-top:10px">
      <button @click="goBack">Back</button>
      <button @click="handleRegister" :disabled="loading">
        {{ loading ? 'Registering...' : 'Confirm & Register' }}
      </button>
    </div>

    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">Registration Successful!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'
import type { User } from '../../types/User'

const router = useRouter()
const formData = ref<User | null>(null)
const loading = ref(false)
const error = ref('')
const success = ref(false)

onMounted(() => {
  const step1 = JSON.parse(localStorage.getItem('registerStep1') || 'null')
  const step2 = JSON.parse(localStorage.getItem('registerStep2') || 'null')

  if (!step1 || !step2) {
    router.push('/register')
    return
  }

  formData.value = { ...step1, ...step2 }
})

const goBack = () => {
  router.push('/register/step-2')
}

const handleRegister = async () => {
  if (!formData.value) return

  try {
    loading.value = true
    error.value = ''

    await authService.register(formData.value)

    localStorage.removeItem('registerStep1')
    localStorage.removeItem('registerStep2')

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
