<script setup lang="ts">
const exercises = ["Push Ups", "Squats", "Lunges", "Plank", "Burpees", "Jumping Jacks", "Deadlifts"]

const workoutOverview = { path: "/program/0" }
const workoutOverview2 = { path: "/program/1" }

const logExercises = [
  { name: "Push ups", path: "/workout/log/1" },
  { name: "Squats", path: "/workout/log/2" },
  { name: "Lunges", path: "/workout/log/3" }
]

import { useRoute } from "vue-router"
import router from "@/router"
import SideNav from "@/components/Navigation/SideNav.vue"

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
</script>

<template>
  <SideNav />
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold mb-6">Log Overview Grid</h1>
    <div class="grid grid-cols-2 gap-3 w-80">
      <router-link
        v-for="(logExercise, index) in logExercises"
        :key="index"
        :to="logExercise.path"
        class="z-40 custom-transform flex items-center justify-center h-32 w-100 bg-blue-500 text-white font-bold rounded-lg shadow-lg"
      >
        {{ logExercise.name }}
      </router-link>
    </div>
  </div>
</template>

<style>
.custom-transform {
  animation-name: grow;
  animation-duration: 1s;
  /* transition:
    transform 0.5s ease,
    opacity 0.5s ease; */
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

/* ::view-transition-old(root) { */
/* animation: 0.5s ease-in both move-out; */
/* animation: scaleOut 0.5s forwards; */
/* animation: 3s scaleOut; */
/* } */

/* ::view-transition-new(root) { */
/* animation: 0.5s ease-in both move-in; */
/* animation: scaleIn 0.5s forwards; */
/* animation: scale-up-center 2s ease-out 0.2s; */
/* } */

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
</style>
<!-- max-w-4xl -->
