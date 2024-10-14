<script setup lang="ts">
import router from "@/router"

function handleNavigation(event) {
  console.log("heere: ", event)

  // Store the click position
  const x = event.clientX
  const y = event.clientY

  // Get the distance to the furthest corner
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  // Start the view transition
  const transition = document.startViewTransition(() => {
    router.push({ name: "WORKOUT_HOME" })
    console.log("9999")
  })

  // Wait for the pseudo-elements to be created
  transition.ready.then(() => {
    // Animate the new view
    document.documentElement.animate(
      {
        clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: "::view-transition-new(root)"
      }
    )
  })
}
</script>

<template>
  <div class="min-h-screen text-white bg-primaryBg">
    <div>program page: show active program, create program,</div>
    <button @click="handleNavigation">test</button>
  </div>
</template>

<style>
::view-transition-image-pair(root) {
  isolation: auto;
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
</style>
