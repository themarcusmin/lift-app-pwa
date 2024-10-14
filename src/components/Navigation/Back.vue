<script setup lang="ts">
import router from "@/router"
import { WORKOUT_HOME } from "@/router/private"
import { useNavStore } from "@/stores/nav"
const { showNav } = useNavStore()

function handleBack() {
  router.push({ name: WORKOUT_HOME })
  showNav()
}
</script>

<template>
  <button @click="handleBack">
    <div>
      <span
        class="bg-secondaryBg border-2 border-neutral-500 rounded-full w-10 h-10 flex items-center justify-center"
        >&lt;</span
      >
    </div>
  </button>
</template>
