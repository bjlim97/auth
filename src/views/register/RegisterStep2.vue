<template>
  <div class="container">
    <div class="card">
      <RegisterProgress :currentStep="2" />

      <h2>Create Account</h2>
      <p class="subtitle">Step 2: Personal Information</p>

      <form @submit.prevent="handleNext">
        <div class="form-group">
          <label>Name</label>
          <input v-model="name" required />
        </div>

        <div class="form-group">
          <label>Phone</label>
          <input v-model="phone" required />
        </div>

        <div class="form-group">
          <label>Address</label>
          <input v-model="address" required />
        </div>

        <div class="form-group">
          <label>Age</label>
          <input v-model.number="age" type="number" required />
        </div>

        <div class="form-group">
          <label>Gender</label>
          <select v-model="gender" required>
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div class="button-group">
          <button type="button" class="secondary" @click="goBack">Back</button>

          <button type="submit" :disabled="loading">
            {{ loading ? "Processing..." : "Next" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import RegisterProgress from "../../components/RegisterProgress.vue";

const router = useRouter();

const name = ref("");
const phone = ref("");
const address = ref("");
const age = ref<number | null>(null);
const gender = ref("");
const loading = ref(false);

onMounted(() => {
  const step1 = localStorage.getItem("registerStep1");
  if (!step1) {
    router.push("/register");
    return;
  }

  const savedStep2 = JSON.parse(
    localStorage.getItem("registerStep2") || "null",
  );

  if (savedStep2) {
    name.value = savedStep2.name;
    phone.value = savedStep2.phone;
    address.value = savedStep2.address;
    age.value = savedStep2.age;
    gender.value = savedStep2.gender;
  }
});

const goBack = () => {
  router.push("/register");
};

const handleNext = async () => {
  loading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  localStorage.setItem(
    "registerStep2",
    JSON.stringify({
      name: name.value,
      phone: phone.value,
      address: address.value,
      age: age.value,
      gender: gender.value,
    }),
  );

  loading.value = false;
  router.push("/register/step-3");
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f4f6;
}

.card {
  background: white;
  padding: 40px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  margin-top: 5px;
  transition: 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4f46e5;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

button:not(.secondary) {
  background: #4f46e5;
  color: white;
}

button:not(.secondary):hover:not(:disabled) {
  background: #4338ca;
}

.secondary {
  background: white;
  border: 2px solid #4f46e5;
  color: #4f46e5;
}

.secondary:hover {
  background: #4f46e5;
  color: white;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
