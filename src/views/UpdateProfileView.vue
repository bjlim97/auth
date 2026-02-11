<template>
  <div>
    <h2>Update Profile</h2>

    <form v-if="form" @submit.prevent="handleUpdate">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.phone" placeholder="Phone" required />
      <input v-model="form.address" placeholder="Address" required />
      <input v-model.number="form.age" type="number" placeholder="Age" required />

      <select v-model="form.gender" required>
        <option>Male</option>
        <option>Female</option>
      </select>

      <div style="margin-top:10px">
        <button type="submit" :disabled="loading">
          {{ loading ? 'Updating...' : 'Update' }}
        </button>
      </div>
    </form>

    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">Profile Updated Successfully!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'
import type { User } from '../types/User'

const router = useRouter()
const form = ref<User | null>(null)
const loading = ref(false)
const error = ref('')
const success = ref(false)

onMounted(() => {
  const user = authService.getCurrentUser()
  if (!user) {
    router.push('/login')
    return
  }

  form.value = { ...user }
})

const handleUpdate = async () => {
  if (!form.value) return

  try {
    loading.value = true
    error.value = ''
    success.value = false

    await authService.updateProfile(form.value)

    success.value = true

    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)

  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
