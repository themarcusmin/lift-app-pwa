const LandingView = () => import("@/features/auth/LandingView.vue")
const LoginView = () => import("@/features/auth/LoginView.vue")
const RegisterView = () => import("@/features/auth/RegisterView.vue")

export const LANDING = "landing"
export const LOGIN = "login"
export const REGISTER = "register"

export const publicRoutes = [
  {
    path: "/",
    name: LANDING,
    component: LandingView
    // meta: { requiresAuth: false }
  },
  {
    path: "/login",
    name: LOGIN,
    component: LoginView
    // meta: { requiresAuth: false }
  },
  {
    path: "/register",
    name: REGISTER,
    component: RegisterView
    // meta: { requiresAuth: false }
  }
]
