<script setup lang="ts">
import {
  onBeforeRouteUpdate,
  RouterView,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from "vue-router"
import NavBar from "@/components/Navigation/NavBar.vue"

// console.log("check: ", document.startViewTransition)
const isViewTransitionAPISupported = document.startViewTransition

async function useViewTransitionAPI(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  if (isViewTransitionAPISupported.value) {
    // With View Transitions:
    const transition = document.startViewTransition(() => doVueOwnTransition(to, from, next))

    transition.finished.then(() => {
      // do some side effects
    })
  } else {
    // Fallback for browsers that don't support View Transitions:
    doVueOwnTransition(to, from)
  }

  next()
}

onBeforeRouteUpdate(useViewTransitionAPI)
</script>

<template>
  <!-- <router-view v-slot="{ Component }">
    <transition name="scale-slide">
      <div class="bg-gray-700 text-white min-h-screen wrapper">
        <component :is="Component" />
      </div>
    </transition>
  </router-view> -->
  <!-- <RouterView v-if="isViewTransitionAPISupported" class="child-view" /> -->
  <RouterView v-if="isViewTransitionAPISupported" class="child-view" />
  <RouterView v-else v-slot="{ Component }">
    <transition name="scale-slide">
      <component class="child-view" :is="Component" />
    </transition>
  </RouterView>
  <NavBar />
</template>

<!-- <RouterView /> -->

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .child-view {
    animation: none;
  }
}
/* Optional hover effects for visual feedback */
/* .router-link-active:hover {
  background-color: #ffffff;
} */

.wrapper {
  /* background: rgb(253, 193, 193); */
  width: 100%;
  min-height: 100vh;
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  transform: scale(1);
}

.scale-slide-leave-to {
  transform: scale(0.8);
}
</style>
