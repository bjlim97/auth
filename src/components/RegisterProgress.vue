<template>
  <div class="progress-container">
    <div class="progress">
      <div class="progress-line" :style="{ width: progressWidth }"></div>

      <div
        v-for="n in 3"
        :key="n"
        class="circle"
        :class="{ active: n <= currentStep }"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentStep: number;
}>();

const progressWidth = computed(() => {
  return ((props.currentStep - 1) / 2) * 100 + "%";
});
</script>

<style scoped>
.progress-container {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.progress {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.progress::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  width: 100%;
  background: #e5e7eb;
  transform: translateY(-50%);
  z-index: 0;
}

.progress-line {
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  background: #4f46e5;
  transform: translateY(-50%);
  z-index: 1;
  transition: 0.3s ease;
}

.circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: white;
  border: 3px solid #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  font-weight: bold;
  color: #9ca3af;
}

.circle.active {
  border-color: #4f46e5;
  color: #4f46e5;
}
</style>
