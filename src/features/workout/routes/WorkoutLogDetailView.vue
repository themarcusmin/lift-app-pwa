<script setup lang="ts">
import SideNav from "../../../components/Navigation/SideNav.vue"
import { ref } from "vue"
import { useSwipeStore } from "@/stores/swipe"
import { storeToRefs } from "pinia"

import AddIcon from "@/assets/addIcon.svg"
import DeleteIcon from "@/assets/deleteIcon.svg"
import Timer from "@/components/Timer/Timer.vue"

const swipeStore = useSwipeStore()
const { swipeAnimation } = storeToRefs(swipeStore)

const workoutLogsSize = 5

const workoutLogs = ref([
  { id: 1, reps: 10, weight: 30, completed: false },
  { id: 22, reps: 10, weight: 30, completed: false },
  { id: 33, reps: 10, weight: 30, completed: false }
])

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

const timerRef = ref<number | null>(null)
function handleLogComplete(logid: number) {
  workoutLogs.value.map(({ id, completed }) => {
    if (id === logid) completed = !completed
  })
  timerRef.value.startTimer()
}
</script>

<template>
  <div class="relative">
    <div
      class="h-screen px-8 py-12 flex flex-col gap-6 text-white bg-primaryBg"
      :class="[swipeAnimation]"
    >
      <p
        class="text-4xl tracking-wide bg-gradient-to-r from-fuchsia-300 via-purple-400 to-purple-500 bg-clip-text text-transparent"
      >
        Tricep Pushdowns
      </p>
      <div class="flex">
        <button
          class="border-0 border-b-2 border-primaryPurple text-primaryPurple font-semibold w-full py-3"
        >
          Log
        </button>
        <button class="border-0 border-b-2 border-neutral-500 text-neutral-400 w-full py-3">
          Stats
        </button>
      </div>
      <div
        class="text-primaryGray bg-secondaryBg font-semibold opacity-75 rounded-3xl p-4 flex flex-col gap-5 items-center"
      >
        <div class="flex gap-4">
          <div class="text-primaryPurple text-lg">Triceps</div>
        </div>
        <div v-for="log in workoutLogs" :key="log.id" class="flex gap-4 items-center">
          <input
            type="number"
            v-model="log.reps"
            class="border-0 border-b-2 border-primaryGray bg-transparent w-16 py-2 focus:border-purple-400 focus:ring-0 text-center"
            :class="{
              'text-primaryPurple border-primaryPurple': log.completed
            }"
          />
          <span
            :class="{
              'text-primaryPurple': log.completed
            }"
            >reps</span
          >

          <input
            type="number"
            v-model="log.weight"
            class="border-0 border-b-2 border-primaryGray bg-transparent w-16 py-2 focus:border-purple-400 focus:ring-0 text-center"
            :class="{
              'text-primaryPurple border-primaryPurple': log.completed
            }"
          />
          <span
            :class="{
              'text-primaryPurple': log.completed
            }"
            >kg</span
          >
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
              class="flex items-center justify-center w-6 h-6 rounded-lg bg-transparent border-2 border-neutral-400 cursor-pointer peer-checked:bg-purple-500 peer-checked:border-none"
            >
            </label>
            <DeleteIcon class="w-7 h-7 self-center" @touchend="handleDeleteLog(log.id)" />
          </div>
        </div>
        <div class="flex justify-center" v-if="workoutLogs.length < workoutLogsSize">
          <AddIcon class="w-10 h-10" @touchend="handleAddLog" />
        </div>
      </div>
      <Timer ref="timerRef" />
    </div>
    <SideNav />
  </div>
</template>

<style>
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
