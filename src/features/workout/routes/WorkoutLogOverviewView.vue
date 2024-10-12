<script setup lang="ts">
import { useSwipeStore } from "@/stores/swipe"
import { storeToRefs } from "pinia"

const swipeStore = useSwipeStore()
const { swipeAnimation } = storeToRefs(swipeStore)

import router from "@/router"
import SideNav from "@/components/Navigation/SideNav.vue"
import { ref } from "vue"

const exercises = ["Push Ups", "Squats", "Lunges", "Plank", "Burpees", "Jumping Jacks", "Deadlifts"]

const logExercises = ref([
  { name: "Push ups", path: "/workout/log/1" },
  { name: "Squats", path: "/workout/log/2" },
  { name: "Lunges", path: "/workout/log/3" }
])

function goTo1Func() {
  //   let nextProgramID = Number(route.params.programid) + 1
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)]

  // fallback
  // if (!document.startViewTransition) {
  //   updateTheDOMSomehow(data);
  //   return;
  // }

  // @ts-ignore
  document.startViewTransition(() => {
    router.push({ name: "PROGRAM_DETAIL", params: { programid: 1 } })
  })
}

function handleAddExercise() {
  logExercises.value.push({ name: "Bicep Curls", path: "/workout/log/4" })
}
</script>
<template>
  <div class="relative">
    <div
      class="h-screen px-10 py-12 flex flex-col gap-6 text-white bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-400"
      :class="[swipeAnimation]"
    >
      <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-2xl font-bold mb-6">Push Day</h1>
        <div class="flex flex-col gap-4 w-80">
          <router-link
            v-for="(logExercise, index) in logExercises"
            :key="index"
            :to="logExercise.path"
            class="z-40 custom-transform flex items-center justify-center h-12 w-72 border-2 border-gray-400 rounded-full"
          >
            {{ logExercise.name }}
          </router-link>
          <button
            @click="handleAddExercise"
            class="custom-transform h-12 w-72 border-2 border-gray-400 rounded-full"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <SideNav />
  </div>
</template>

<style>
.custom-transform {
  animation-name: grow;
  animation-duration: 1.2s;
}

@keyframes grow {
  0% {
    transform: scale(0.2); /* 0 */
    /* opacity: 0; */
  }
  100% {
    transform: scale(1);
    /* opacity: 1; */
  }
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
