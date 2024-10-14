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
import { PROFILE, PROGRAM_HOME, WORKOUT_HOME } from "@/router/private"
// import logo from '@/assets/logo.svg'

// const user = useCurrentUser()!
// const auth = useFirebaseAuth()!
const route = useRoute()

async function logout() {
  // await signOut(auth)
  router.push({ name: LANDING })
}

import { useNavStore } from "@/stores/nav"
import { storeToRefs } from "pinia"

const navStore = useNavStore()
const { isHidden } = storeToRefs(navStore)

const navItems = [
  {
    to: "/program",
    icon: ProgramIcon,
    label: "Program",
    routeName: PROGRAM_HOME
  },
  {
    to: "/workout",
    icon: DumbbellIcon,
    label: "Workout",
    routeName: WORKOUT_HOME
  },
  {
    to: "/profile",
    icon: ProfileIcon,
    label: "Profile",
    routeName: PROFILE
  }
]

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

function getFill(routeTo: string) {
  return route.path.startsWith(routeTo) ? "fill-purple-500" : "fill-neutral-400"
}

function getTextColor(routeTo: string) {
  return route.path.startsWith(routeTo) ? "text-purple-500" : "text-neutral-400"
}
</script>
<template>
  <Disclosure
    as="nav"
    class="bg-neutral-800 shadow fixed bottom-0 left-0 right-0 w-full rounded-t-lg"
    :class="{
      hidden: isHidden
    }"
  >
    <div class="overflow-hidden flex h-24 w-full text-white">
      <RouterLink
        as="button"
        @click="createRipple($event)"
        v-for="(navItem, index) in navItems"
        :key="index"
        :to="navItem.to"
        class="ripple-animate flex flex-col flex-grow justify-center items-center"
      >
        <component
          :is="navItem.icon"
          class="w-10 h-10 fill-neutral-500"
          :class="getFill(navItem.to)"
        />
        <div class="text-xs" :class="getTextColor(navItem.to)">{{ navItem.label }}</div>
      </RouterLink>
    </div>
  </Disclosure>
</template>

<style>
.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.5s linear;
  background-color: rgba(255, 255, 255, 0.7);
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
}
</style>
