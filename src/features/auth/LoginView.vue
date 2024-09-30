<script setup lang="ts">
// import { signInWithRedirect, getRedirectResult } from 'firebase/auth'
// import { googleAuthProvider } from '@/lib/firebase'
// import { useFirebaseAuth } from 'vuefire'
import { onMounted, ref } from "vue"
import { useHead } from "@unhead/vue"
// import AppHead from '@/components/Head/AppHead.vue'
import LoadingSpinner from "@/components/Loader/LoadingSpinner.vue"
// import { useRoute } from 'vue-router'

import router from "@/router"
import { REGISTER } from "@/router/public"
// const auth = useFirebaseAuth()!

useHead({
  title: "Lift App | Login"
})
// const route = useRoute()

function login() {
  console.log("here")
  router.push({ name: "home" })
  // router.resolve({ name: 'home' })
}

function register() {
  router.push({ name: REGISTER })
}
const loadingSpinner = ref(false)
// const error = ref(null)

// async function getStarted() {
//   signInWithRedirect(auth, googleAuthProvider)
//     .catch((reason) => {
//       console.error('Failed signinRedirect', reason)
//       error.value = reason
//     })
//     .then(() => {
//       loadingSpinner.value = true
//     })
// }

// onMounted(() => {
//   getRedirectResult(auth).catch((reason) => {
//     console.error('Failed redirect result', reason)
//     error.value = reason
//   })
// }) bg-gradient-to-b from-yellow-50 to-primaryYellow
</script>

<template>
  <!-- <AppHead description="Welcome to Intent" /> -->
  <LoadingSpinner v-if="loadingSpinner" />
  <div v-else class="h-[100vh] bg-gradient-to-b from-yellow-50 to-primaryYellow">
    <div
      class="h-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col justify-center"
    >
      <form class="rounded pt-6 pb-4 mb-4">
        <h2 class="text-4xl mb-6 tracking-tight text-gray-900 sm:text-4xl">
          <span class="block">Welcome</span>
          <span>Back!</span>
        </h2>
        <div class="mb-4">
          <label class="block text-gray-900 text-sm font-bold mb-2" for="username">Email</label>
          <input
            class="h-12 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-900 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="h-12 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <div class="text-right">
            <a class="text-md text-gray-700 cursor-pointer" @click="">Forgot Password?</a>
          </div>
        </div>
        <div
          class="flex justify-center shadow shadow-gray-600 rounded-md px-6 py-3 bg-black hover:bg-gray-700 hover:cursor-pointer text-amber-200"
        >
          <button id="login" class="cursor-pointer uppercase" @click="login">login</button>
        </div>
        <div class="my-4 flex gap-1 justify-center">
          <div class="font-light">Don't have an Account?</div>
          <a class="text-md text-blue-700 cursor-pointer" @click="register">Sign up</a>
        </div>
        <p class="text-red-500 text-sm font-bold text-center italic">Incorrect Credentials.</p>
      </form>
    </div>
  </div>
</template>
