<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/vue"
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline"

import ProgramIcon from "@/assets/programIcon.svg"
import DumbbellIcon from "@/assets/dumbbellIcon.svg"
import ProfileIcon from "@/assets/profileIcon.svg"
// import { signOut } from 'firebase/auth'
// import { useCurrentUser, useFirebaseAuth } from 'vuefire'

import { useRoute } from "vue-router"
import router from "@/router"
import { LANDING } from "@/router/public"
import { HOME } from "@/router/private"
// import logo from '@/assets/logo.svg'

// const user = useCurrentUser()!
// const auth = useFirebaseAuth()!
const route = useRoute()

async function logout() {
  // await signOut(auth)
  router.push({ name: LANDING })
}

// if (user) {
//   console.log('aasasf', user)
// }

// defineProps({
//   display: {
//     type: Boolean,
//     default: true
//   }
// })
// :class="{
//       hidden: !display
//     }"

const navItems = [
  {
    to: "/program",
    icon: ProgramIcon,
    label: "Program"
  },
  {
    to: "/workout",
    icon: DumbbellIcon,
    label: "Workout"
  },
  {
    to: "/profile",
    icon: ProfileIcon,
    label: "Profile"
  }
]

// Store the last click event
// let lastClick;
// addEventListener('click', event => (lastClick = event));

// function spaNavigate(data) {
//   // Fallback for browsers that don't support this API:
//   if (!document.startViewTransition) {
//     updateTheDOMSomehow(data);
//     return;
//   }

//   // Get the click position, or fallback to the middle of the screen
//   const x = lastClick?.clientX ?? innerWidth / 2;
//   const y = lastClick?.clientY ?? innerHeight / 2;
//   // Get the distance to the furthest corner
//   const endRadius = Math.hypot(
//     Math.max(x, innerWidth - x),
//     Math.max(y, innerHeight - y)
//   );

//   // Create a transition:
//   const transition = document.startViewTransition(() => {
//     updateTheDOMSomehow(data);
//   });

//   // Wait for the pseudo-elements to be created:
//   transition.ready.then(() => {
//     // Animate the root's new view
//     document.documentElement.animate(
//       {
//         clipPath: [
//           \`circle(0 at ${x}px ${y}px)\`,
//           \`circle(${endRadius}px at ${x}px ${y}px)\`,
//         ],
//       },
//       {
//         duration: 500,
//         easing: 'ease-in',
//         // Specify which pseudo-element to animate
//         pseudoElement: '::view-transition-new(root)',
//       }
//     );
//   });
// }
function createRipple(event: MouseEvent) {
  // Create a span element for the ripple
  const ripple = document.createElement("span")
  const button = event.currentTarget as HTMLElement

  // Get the button's dimensions and position
  const rect = button.getBoundingClientRect()
  const size = 50 //Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  // Set the styles for the ripple
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.classList.add("ripple")

  // Append the ripple to the button
  button.appendChild(ripple)

  // Remove the ripple after the animation is done
  setTimeout(() => {
    ripple.remove()
  }, 600) // Match this duration with your CSS animation duration
}
</script>

<template>
  <Disclosure
    as="nav"
    class="bg-gradient-to-b from-slate-900 via-gray-700 to-gray-500 shadow fixed bottom-0 left-0 right-0 w-full rounded-t-lg"
  >
    <div class="overflow-hidden flex h-20 w-full text-white">
      <RouterLink
        as="button"
        @click="createRipple($event)"
        v-for="(navItem, index) in navItems"
        :key="index"
        :to="navItem.to"
        class="ripple-animate flex flex-col flex-grow justify-center items-center"
      >
        <component :is="navItem.icon" class="w-10 h-10 fill-red-500" />
        <!-- <div v-html="navItem.icon" class="w-10 h-10" /> -->
        <!-- <ProfileIcon /> -->
        <!-- <img :src="navItem.icon" class="w-10 fill-red-400" /> -->
        <div class="text-xs">{{ navItem.label }}</div>
      </RouterLink>
    </div>
  </Disclosure>
</template>

<style>
.ripple {
  position: absolute; /* The absolute position we mentioned earlier */
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.5s linear;
  /* ripple cubic-bezier(0.6, 0.04, 0.98, 0.335) linear; */
  background-color: rgba(255, 255, 255, 0.7);
  /* z-index: 2; */
}

@keyframes ripple {
  to {
    transform: scale(3);
    opacity: 0;
  }
}

.ripple-animate {
  position: relative;
  overflow: visible;
  /* z-index: 1; */
}
</style>
