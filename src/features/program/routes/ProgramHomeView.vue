<script setup lang="ts"></script>

<template>
  <div class="h-screen z-40 overflow-hidden text-white py-12 bg-primaryBg">
    <h1 class="mx-8 mb-6 text-2xl font-bold">Program</h1>
    <div>
      <div class="py-5 px-8 bg-secondaryBg text-primaryPurple flex justify-between">
        <div class="">Active Program</div>
      </div>
      <div class="p-4 text-neutral-400">You don't have an active workout program.</div>
      <!-- <RouterLink
        to="/workout/log"
        class="flex items-center border-b-2 border-neutral-500 py-4 px-6 gap-6"
      >
        <p class="text-lg">Push, Pull, Leg</p>
      </RouterLink> -->
    </div>
    <RouterLink to="/program/create">
      <div
        class="text-purple-900 bg-primaryPurple font-semibold h-12 w-full flex items-center justify-center"
      >
        Create Program
      </div>
    </RouterLink>
  </div>
</template>
