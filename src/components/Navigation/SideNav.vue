<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import router from "@/router"
const route = useRoute() // Get the current route

// Define the list of navigation items
// const navItems = [
//   { path: "/program/1", workoutNumber: 0 },
//   { path: "/program/2", workoutNumber: 1 },
//   { path: "/program/3", workoutNumber: 2 }
// ]

const navItems = [
  { name: "Push ups", path: "/workout/log/1" },
  { name: "Squats", path: "/workout/log/2" },
  { name: "Lunges", path: "/workout/log/3" }
]

const _navItems = []

// Method to check if the current route is active
const isActive = (path) => {
  return route.path === path
}

import type { UseSwipeDirection } from "@vueuse/core"
import { useSwipe } from "@vueuse/core"
import { computed } from "vue"
import { useSwipeStore } from "@/stores/swipe"

const currLogID = computed(() => Number(route.params.logid))

const { swipeUp, swipeDown } = useSwipeStore()

const itemsCount = 3

const target = ref<HTMLElement | null>(null)
const { direction } = useSwipe(target, {
  passive: false,
  onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
    let newLogID: number
    if (direction == "down") {
      swipeDown()
      console.log("debug swipe down ", currLogID.value)
      //   console.log("0: swiping down ", currLogID.value)

      //   console.log("swiping down", { newLogID })
      if (currLogID.value == 1) {
        // @ts-ignore
        if (document.startViewTransition) {
          // @ts-ignore
          document.startViewTransition(() => {
            router.push({ name: "WORKOUT_LOG_OVERVIEW" })
          })
        } else {
          router.push({ name: "WORKOUT_LOG_OVERVIEW" })
        }
      }
      if (currLogID.value > 1) {
        newLogID = currLogID.value > 1 ? currLogID.value - 1 : 1
        // console.log("1: swiping down ", newLogID)
        // @ts-ignore
        if (document.startViewTransition) {
          // @ts-ignore
          document.startViewTransition(() => {
            router.push({ name: "WORKOUT_LOG_DETAIL", params: { logid: newLogID } })
          })
        } else {
          router.push({ name: "WORKOUT_LOG_DETAIL", params: { logid: newLogID } })
        }
      }
    } else if (direction == "up") {
      swipeUp()
      // console.log("debug swipe up ", currLogID.value)
      //   console.log("debug swipe up ", swipe.isSwipeUp)
      //   console.log("0: swiping up ", currLogID.value)
      if (route.path === "/workout/log" && !currLogID.value) {
        // console.log("continue swipe up")
        // @ts-ignore
        if (document.startViewTransition) {
          // @ts-ignore
          document.startViewTransition(() => {
            router.push({ name: "WORKOUT_LOG_DETAIL", params: { logid: 1 } })
          })
        } else {
          router.push({ name: "WORKOUT_LOG_DETAIL", params: { logid: 1 } })
        }
      }
      if (currLogID.value < 3) {
        newLogID = currLogID.value < 3 ? currLogID.value + 1 : 3
        // console.log("1: swiping up ", newLogID)
        // @ts-ignore
        if (document.startViewTransition) {
          // @ts-ignore
          document.startViewTransition(() => {
            router.push({ name: "WORKOUT_LOG_DETAIL", params: { logid: newLogID } })
          })
        } else {
          router.push({ name: "WORKOUT_LOG_DETAIL", params: { logid: newLogID } })
        }
      }
    }
  }
})

function goToOverview() {
  // document.startViewTransition(() => {
  console.log(99)
  console.log(route.path)
  // router.push({ name: "LOG_OVERVIEW" })
  // })
}

function goToMain() {
  router.push({ name: "WORKOUT_LOG_OVERVIEW" })
}

function goToPage(pathx) {
  console.log(89)
  if (document.startViewTransition)
    router.push({ name: "WORKOUT_LOG_DETAIL", params: { logid: 2 } })
}
</script>
<template>
  <div
    ref="target"
    class="z-0 fixed right-0 top-0 h-screen bg-transparent disabled-animate w-16 flex flex-col items-center justify-center space-y-4"
  >
    <router-link to="/workout/log" class="grid grid-cols-2 grid-rows-2 gap-1 w-5 h-5">
      <div
        v-for="index in 4"
        :key="index"
        :class="{
          'bg-white transition ease-in-out': route.path === '/workout/log',
          'bg-gray-500': route.path !== '/workout/log'
        }"
      ></div>
    </router-link>

    <router-link
      v-for="(item, index) in navItems"
      :key="index"
      :to="item.path"
      @touchend="goToPage(item.path)"
      class="w-3 h-3 rounded-full transition-colors transition-all duration-1000 ease-in-out"
      :class="{
        'bg-white scale-150 transition ease-in-out': isActive(item.path),
        'bg-gray-500': !isActive(item.path)
      }"
    >
    </router-link>
  </div>
</template>

<style>
.disabled-animate {
  view-transition-name: disabled-animate;
}

::view-transition-old(disabled-animate),
::view-transition-new(disabled-animate) {
  animation-duration: 0s !important;
}
</style>
