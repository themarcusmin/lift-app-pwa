import { createRouter, createWebHistory } from "vue-router"

import { publicRoutes } from "./public"
import { privateRoutes } from "./private"
import { errorRoute } from "./error"

import { useNavStore } from "@/stores/nav"

const routes = [...publicRoutes, ...privateRoutes, ...errorRoute]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { hideNav } = useNavStore()

  if (to.meta.hideNav) hideNav()
  next()
})

export default router
