<template>
  <div>
    <h2>Register - Step 2</h2>

    <form @submit.prevent="handleNext">
      <input v-model="name" placeholder="Name" required />
      <input v-model="phone" placeholder="Phone" required />
      <input v-model="address" placeholder="Address" required />
      <input v-model.number="age" type="number" placeholder="Age" required />
      
      <select v-model="gender" required>
        <option disabled value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <div style="margin-top:10px">
        <button type="button" @click="goBack">Back</button>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Loading...' : 'Next' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const phone = ref('')
const address = ref('')
const age = ref<number | null>(null)
const gender = ref('')
const loading = ref(false)

onMounted(() => {
  const step1 = localStorage.getItem('registerStep1')
  if (!step1) {
    router.push('/register')
    return
  }

  const savedStep2 = JSON.parse(
    localStorage.getItem('registerStep2') || 'null'
  )

  if (savedStep2) {
    name.value = savedStep2.name
    phone.value = savedStep2.phone
    address.value = savedStep2.address
    age.value = savedStep2.age
    gender.value = savedStep2.gender
  }
})

const goBack = () => {
  router.push('/register')
}

const handleNext = async () => {
  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 1000))

  localStorage.setItem(
    'registerStep2',
    JSON.stringify({
      name: name.value,
      phone: phone.value,
      address: address.value,
      age: age.value,
      gender: gender.value
    })
  )

  loading.value = false
  router.push('/register/step-3')
}
</script>
