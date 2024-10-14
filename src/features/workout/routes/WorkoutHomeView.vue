<script setup lang="ts">
import PushIcon from "@/assets/pushIcon.svg"
import PullIcon from "@/assets/pullIcon.svg"
import LegIcon from "@/assets/legIcon.svg"
import WorkoutIcon from "@/assets/workoutIcon.svg"
</script>

<template>
  <div class="h-screen z-40 overflow-hidden text-white py-12 bg-primaryBg">
    <h1 class="mx-8 mb-6 text-2xl font-bold">Workout</h1>
    <div>
      <div class="py-5 px-8 bg-secondaryBg text-primaryPurple flex justify-between">
        <div>Push, Pull, Leg</div>
      </div>
      <RouterLink
        to="/workout/log"
        class="flex items-center border-b-2 border-neutral-500 p-4 gap-6"
      >
        <PushIcon class="w-8 h-8" />
        <p class="text-lg">Push</p>
      </RouterLink>
      <div class="flex items-center border-b-2 border-neutral-500 p-4 gap-6">
        <PullIcon class="w-8 h-8" />
        <p class="text-lg">Pull</p>
      </div>
      <div class="flex items-center border-b-2 border-neutral-500 p-4 gap-6">
        <LegIcon class="w-8 h-8" />
        <p class="text-lg">Leg</p>
      </div>
    </div>
    <div>
      <div class="py-5 px-8 bg-secondaryBg text-primaryPurple flex justify-between">
        <div>Custom</div>
      </div>
      <div class="flex items-center border-b-2 border-neutral-500 p-4 gap-6">
        <WorkoutIcon class="w-8 h-8" />
        <p class="text-lg">New Workout</p>
      </div>
    </div>
  </div>
</template>
