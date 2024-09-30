<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useHead } from "@unhead/vue"
import LoadingSpinner from "@/components/Loader/LoadingSpinner.vue"

import router from "@/router"
import { LOGIN } from "@/router/public"

useHead({
  title: "Lift App"
})

function login() {
  router.push({ name: LOGIN })
}

const loadingSpinner = ref(false)
</script>

<template>
  <LoadingSpinner v-if="loadingSpinner" />
  <div
    v-else
    class="h-[100vh] flex flex-col items-center justify-between bg-gradient-to-b from-yellow-50 to-primaryYellow"
  >
    <div></div>
    <div class="max-w-7xl mx-auto mt-10 text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        <span class="block">LiftApp</span>
      </h2>
      <p class="text-customGray">Your Personalized Workout Tracker</p>
    </div>
    <div class="my-8 flex flex-col gap-2 items-center">
      <div
        class="flex justify-center shadow shadow-gray-600 rounded-md w-80 px-6 py-3 bg-black hover:bg-gray-700 hover:cursor-pointer text-amber-200"
      >
        <button id="login" class="cursor-pointer uppercase" @click="login">login</button>
      </div>
      <div
        class="flex justify-center shadow shadow-gray-600 rounded-md w-80 px-6 py-3 bg-customYellow hover:bg-customYellowHover hover:cursor-pointer text-black"
      >
        <button id="login" class="cursor-pointer uppercase" @click="">register</button>
      </div>
    </div>
  </div>
</template>
