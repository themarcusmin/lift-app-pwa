<script setup lang="ts">
import { computed, ref } from "vue"

const restTime = 5 // Total time for the countdown (in seconds)
const timeRemaining = ref(restTime)
const fullDashArray = 339.292 // Circumference of the circle (2 * pi * r for a radius of 54)
const timer = ref<number | null>(null)

// Computed property to calculate stroke-dashoffset
const strokeDashOffset = computed(() => {
  // As time decreases, we want to decrease the strokeDashOffset from full to 0
  return fullDashArray * (timeRemaining.value / restTime)
})

// Start the countdown timer
const startTimer = () => {
  clearInterval(timer.value as number)
  timeRemaining.value = restTime
  timer.value = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--
    } else {
      clearInterval(timer.value as number)
    }
  }, 1000)
}

defineExpose({ startTimer })

const formattedTime = computed(() => {
  if (timeRemaining.value == 0) return "Ready"
  const minutes = String(Math.floor(timeRemaining.value / 60)).padStart(2, "0")
  const seconds = String(timeRemaining.value % 60).padStart(2, "0")
  return `${minutes}:${seconds}`
})
</script>

<script lang="ts"></script>

<template>
  <div class="timer-container" @click="startTimer">
    <svg class="progress-circle w-72 h-72" viewBox="0 0 120 120">
      <!-- Background Circle -->
      <circle class="progress-background" cx="60" cy="60" r="54" />
      <!-- Progress Bar -->
      <circle
        class="progress-bar"
        cx="60"
        cy="60"
        r="54"
        :style="{ strokeDashoffset: strokeDashOffset }"
        stroke-linecap="round"
      />
    </svg>
    <div class="timer-text font-poiret text-5xl">{{ formattedTime }}</div>
  </div>
</template>

<style>
.timer-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-circle {
  transform: rotate(-90deg); /* Rotate to start progress from the top */
}

.progress-background {
  fill: none;
  stroke: #232531; /* Circle outline color */
  stroke-width: 4;
}

.progress-bar {
  fill: none;
  stroke: #c9a0ff; /* Progress bar color */
  stroke-width: 4;
  stroke-dasharray: 339.292; /* Circumference of the circle */
  stroke-dashoffset: 0; /* Start with full visibility */
  transition: stroke-dashoffset 1s linear; /* Smooth transition for countdown */
}

.timer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
</style>
