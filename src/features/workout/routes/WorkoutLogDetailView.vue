<script setup lang="ts">
import router from "@/router"
import { useRoute } from "vue-router"
import SideNav from "../../../components/Navigation/SideNav.vue"
import { ref, computed } from "vue"
import { useSwipeStore } from "@/stores/swipe"
import { storeToRefs } from "pinia"
const route = useRoute()

const swipeStore = useSwipeStore()
const { swipeAnimation } = storeToRefs(swipeStore)

function someFunc() {
  let nextProgramID = Number(route.params.programid) + 1
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  // fallback
  // if (!document.startViewTransition) {
  //   updateTheDOMSomehow(data);
  //   return;
  // }

  // @ts-ignore
  document.startViewTransition(() => {
    router.push({ name: "PROGRAM_DETAIL", params: { programid: nextProgramID } })
    backgroundColor = randomColor
  })
}

function anotherFunc() {
  let nextProgramID = Number(route.params.programid) - 1
  router.push({ name: "PROGRAM_DETAIL", params: { programid: nextProgramID } })
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  backgroundColor = randomColor
}

function swipeFunc() {
  console.log(swipeAnimation.value)
}

const colors = [
  "bg-red-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-teal-200"
]

let backgroundColor = "bg-yellow-200"

const workoutOverview = { path: "/program/0" }

// const swipeAnimation = computed(() => {
//   return isSwipeUp ? "swipe-animate-up" : "swipe-animate-down"
// })
</script>

<template>
  <!-- subtract nav bar h from h and document width -->
  <div class="h-screen w-[calc(100%_-_4rem)]" :class="[backgroundColor, swipeAnimation]">
    <!-- <div class="wrapper"> -->
    <div>showing exercises {{ $route.params.logid }}</div>
    <button class="border bg-red-100 py-5 px-10" @click="anotherFunc">Prev workout</button>
    <button class="border bg-red-100 py-5 px-10" @click="someFunc">Next workout</button>
    <button class="border bg-red-100 py-5 px-10" @click="swipeFunc">Swipe logger</button>
    <!-- </div> -->
  </div>
  <SideNav />
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
