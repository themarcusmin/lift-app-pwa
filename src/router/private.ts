import MainLayout from "@/components/Layouts/MainLayout.vue"

const ProgramHomeView = () => import("@/features/program/routes/ProgramHomeView.vue")

const WorkoutHomeView = () => import("@/features/workout/routes/WorkoutHomeView.vue")
const WorkoutLogOverviewView = () => import("@/features/workout/routes/WorkoutLogOverviewView.vue")
const WorkoutLogDetailView = () => import("@/features/workout/routes/WorkoutLogDetailView.vue")

const ProfileView = () => import("@/features/profile/routes/ProfileView.vue")

export const PROFILE = "PROFILE"
export const PROGRAM_HOME = "PROGRAM_HOME"
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
    component: WorkoutLogOverviewView,
    meta: { hideNav: true }
  },
  {
    path: "/workout/log/:logid",
    name: WORKOUT_DETAIL,
    component: WorkoutLogDetailView,
    meta: { hideNav: true }
  },
  {
    path: "/program",
    name: PROGRAM_HOME,
    component: ProgramHomeView
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
