<script setup lang="ts">
import { useSwipeStore } from "@/stores/swipe"

import { storeToRefs } from "pinia"

const swipeStore = useSwipeStore()
const { swipeAnimation } = storeToRefs(swipeStore)

import SideNav from "@/components/Navigation/SideNav.vue"
import { ref } from "vue"
import Back from "@/components/Navigation/Back.vue"

const exercises = ["Push Ups", "Squats", "Lunges", "Plank", "Burpees", "Jumping Jacks", "Deadlifts"]

const logExercises = ref([
  { name: "Bench Press", path: "/workout/log/1" },
  { name: "Dumbbell Shoulder Press", path: "/workout/log/2" },
  { name: "Trciep Pushdowns", path: "/workout/log/3" }
])

function handleAddExercise() {
  logExercises.value.push({ name: "Bicep Curls", path: "/workout/log/4" })
}
</script>

<template>
  <div class="relative">
    <div
      class="relative h-screen px-8 py-12 flex flex-col gap-6 text-white bg-primaryBg"
      :class="[swipeAnimation]"
    >
      <Back />
      <div class="flex flex-col items-center justify-between h-full w-full">
        <div class="w-full">
          <p
            class="ml-8 mb-6 text-4xl tracking-wide bg-gradient-to-r from-fuchsia-300 via-purple-400 to-purple-500 bg-clip-text text-transparent"
          >
            Push Day
          </p>
          <div class="flex flex-col gap-4 h-100 w-full content-center items-center">
            <router-link
              v-for="(logExercise, index) in logExercises"
              :key="index"
              :to="logExercise.path"
              class="text-primaryGray bg-secondaryBg font-semibold rounded-3xl custom-transform flex items-center justify-center h-12 w-80"
            >
              {{ logExercise.name }}
            </router-link>
            <button
              @click="handleAddExercise"
              class="text-primaryGray bg-secondaryBg font-semibold rounded-3xl custom-transform h-12 w-80"
            >
              +
            </button>
          </div>
        </div>
        <button class="text-black bg-primaryPurple font-semibold rounded-3xl h-12 w-80">
          Done
        </button>
      </div>
    </div>
    <SideNav />
  </div>
</template>

<style>
.custom-transform {
  animation-name: grow;
  animation-duration: 1s;
}

@keyframes grow {
  0% {
    transform: scale(0.2); /* 0 */
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scale-up-center {
  0% {
    transform: scale(0.5); /* 0 */
  }
  100% {
    transform: scale(1);
  }
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

::view-transition-old(swipe-animate-up) {
  animation: 0.8s ease-in both move-out-up;
}

::view-transition-new(swipe-animate-up) {
  animation: 0.8s ease-in both move-in-up;
}
</style>
