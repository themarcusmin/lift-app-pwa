import MainLayout from "@/components/Layouts/MainLayout.vue"

const ProgramHomeView = () => import("@/features/program/routes/ProgramHomeView.vue")
const ProgramCreateView = () => import("@/features/program/routes/ProgramCreateView.vue")

const WorkoutHomeView = () => import("@/features/workout/routes/WorkoutHomeView.vue")
const WorkoutOverviewView = () => import("@/features/workout/routes/WorkoutOverviewView.vue")
const WorkoutDetailView = () => import("@/features/workout/routes/WorkoutDetailView.vue")

const ProfileView = () => import("@/features/profile/routes/ProfileView.vue")

export const PROGRAM_HOME = "PROGRAM_HOME"
export const PROGRAM_CREATE = "PROGRAM_CREATE"

export const PROFILE = "PROFILE"

export const WORKOUT_HOME = "WORKOUT_HOME"
export const WORKOUT_DETAIL = "WORKOUT_DETAIL"
export const WORKOUT_OVERVIEW = "WORKOUT_OVERVIEW"

export const privatePaths = [
  {
    path: "/workout",
    name: WORKOUT_HOME,
    component: WorkoutHomeView
  },
  {
    path: "/workout/log",
    name: WORKOUT_OVERVIEW,
    component: WorkoutOverviewView,
    meta: { hideNav: true }
  },
  {
    path: "/workout/log/:logid",
    name: WORKOUT_DETAIL,
    component: WorkoutDetailView,
    meta: { hideNav: true }
  },
  {
    path: "/program",
    name: PROGRAM_HOME,
    component: ProgramHomeView
  },
  {
    path: "/program/create",
    name: PROGRAM_CREATE,
    component: ProgramCreateView
  },
  {
    path: "/profile",
    name: PROFILE,
    component: ProfileView
  }
]

export const privateRoutes = [
  {
    path: "/app",
    component: MainLayout,
    children: privatePaths
    // meta: { requiresAuth: true }
  }
]
