<script setup lang="ts">
import router from "@/router"
import SideNav from "../../../components/Navigation/SideNav.vue"
import { ref, computed } from "vue"
import { useSwipeStore } from "@/stores/swipe"
import { storeToRefs } from "pinia"

import AddIcon from "@/assets/addIcon.svg"
import DeleteIcon from "@/assets/deleteIcon.svg"

const swipeStore = useSwipeStore()
const { swipeAnimation } = storeToRefs(swipeStore)

const workoutLogsSize = 5

const workoutLogs = ref([
  { id: 1, reps: 10, weight: 30, completed: false },
  { id: 22, reps: 10, weight: 30, completed: false },
  { id: 33, reps: 10, weight: 30, completed: false }
])

// const allocatedRestTime = 120
const restTime = ref(0)
const timer = ref<number | null>(null)

const formattedTime = computed(() => {
  if (restTime.value == 0) return "Ready"
  const minutes = String(Math.floor(restTime.value / 60)).padStart(2, "0")
  const seconds = String(restTime.value % 60).padStart(2, "0")
  return `${minutes}:${seconds}`
})

function startTimer() {
  // Clear any existing timer
  clearInterval(timer.value as number)
  restTime.value = 120 // Reset to 2 minutes
  timer.value = setInterval(() => {
    if (restTime.value > 0) {
      restTime.value--
    } else {
      clearInterval(timer.value as number)
    }
  }, 1000)
}

function handleAddLog() {
  const lastLog = workoutLogs.value[workoutLogs.value.length - 1]
  const newId = Math.floor(Math.random() * 1000) // Generate a random ID
  const newLog = {
    id: newId,
    reps: lastLog.reps,
    weight: lastLog.weight,
    completed: false
  }
  workoutLogs.value.push(newLog)
}

function handleDeleteLog(logid: number) {
  workoutLogs.value = workoutLogs.value.filter(({ id }) => id !== logid)
}

function handleLogComplete(logid: number) {
  workoutLogs.value.map(({ id, completed }) => {
    if (id === logid) completed = !completed
  })
  startTimer()
}
</script>

<template>
  <div class="relative">
    <div
      class="h-screen px-10 py-12 flex flex-col gap-6 text-white bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-400"
      :class="[swipeAnimation]"
    >
      <p class="font-garamond text-4xl">Tricep Pushdowns</p>
      <div class="flex gap-4">
        <button class="bg-white text-black w-20 py-3 rounded-full">Log</button>
        <!-- <button
          class="bg-buttonInactive border-2 border-buttonInactiveBorder w-20 py-3 rounded-full"
        >
          Stats
        </button> -->
      </div>
      <div class="flex justify-center my-5">
        <button class="w-72 h-72 font-poiret text-7xl tracking-wider border-4 rounded-full">
          {{ formattedTime }}
        </button>
      </div>
      <div class="flex flex-col gap-5">
        <div class="flex gap-4">
          <div class="w-28 py-2 text-center">Reps</div>
          <div class="w-28 py-2 text-center">Weight (kg)</div>
        </div>
        <div v-for="log in workoutLogs" :key="log.id" class="flex gap-4">
          <input
            type="number"
            v-model="log.reps"
            class="w-28 py-2 rounded-full border-2 border-white focus:border-orange-400 focus:ring-0 text-center bg-transparent"
          />
          <input
            type="number"
            v-model="log.weight"
            class="w-28 py-2 rounded-full border-2 border-white focus:border-orange-400 focus:ring-0 text-center bg-transparent"
          />
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              class="peer hidden"
              v-model="log.completed"
              :id="'toggle-checkbox-' + log.id"
              @change="handleLogComplete(log.id)"
            />
            <label
              :for="'toggle-checkbox-' + log.id"
              class="flex items-center justify-center w-6 h-6 rounded-lg bg-transparent border-2 border-white cursor-pointer peer-checked:bg-orange-400 peer-checked:border-none"
            >
            </label>
            <DeleteIcon class="w-7 h-7 self-center" @touchend="handleDeleteLog(log.id)" />
          </div>
        </div>
      </div>
      <div class="flex justify-center" v-if="workoutLogs.length < workoutLogsSize">
        <AddIcon class="w-10 h-10" @touchend="handleAddLog" />
      </div>
    </div>
    <SideNav />
  </div>
</template>

<style>
/* styles.css */
.h-screen-minus-4rem {
  height: calc(100vh - 4rem);
}

.swipe-animate-down {
  view-transition-name: swipe-animate-down;
}

.swipe-animate-up {
  view-transition-name: swipe-animate-up;
}

/* swipe up */
@keyframes move-out-up {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(-100%);
  }
}

@keyframes move-in-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0%);
  }
}

/* swipe down */
@keyframes move-out-down {
  from {
    transform: translateY(0%);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes move-in-down {
  from {
    transform: translateY(-100%); /* Start from above */
  }

  to {
    transform: translateY(0%);
  }
}

::view-transition-old(swipe-animate-down) {
  animation: 0.8s ease-in both move-out-down;
}

::view-transition-new(swipe-animate-down) {
  animation: 0.8s ease-in both move-in-down;
}

::view-transition-old(swipe-animate-up) {
  animation: 0.8s ease-in both move-out-up;
}

::view-transition-new(swipe-animate-up) {
  animation: 0.8s ease-in both move-in-up;
}

@keyframes scale-up-center {
  0% {
    transform: scale(0.5); /* 0 */
    /* opacity: 0; */
  }
  100% {
    transform: scale(1);
    /* opacity: 1; */
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scaleOut {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
