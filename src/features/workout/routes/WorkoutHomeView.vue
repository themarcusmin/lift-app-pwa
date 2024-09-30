<script setup lang="ts">
import router from "@/router"
// import { RouterLink } from "vue-router"

function someFunc() {
  console.log("hehe")
  // router.push("/program/44")
  router.push({ name: "WORKOUT_LOG_OVERVIEW" })
}
// "{ name: 'PROGRAM', params: { id: '1' } }
</script>

<template>
  <div>lets pretend this is workout home view-transition-name</div>
  <div>we may choose between PPL</div>
  <button class="border bg-red-100 py-5 px-10" @click="someFunc">Push</button>
  <!-- <RouterLink to="/program/2">Pull</RouterLink>
  <RouterLink to="/program/3">Leg</RouterLink> -->
</template>
