import MainLayout from "@/components/Layouts/MainLayout.vue"
const HomeProtectedView = () => import("@/features/home/routes/HomeProtectedView.vue")

const ProgramHomeView = () => import("@/features/program/routes/ProgramHomeView.vue")

const WorkoutHomeView = () => import("@/features/workout/routes/WorkoutHomeView.vue")
const WorkoutLogOverviewView = () => import("@/features/workout/routes/WorkoutLogOverviewView.vue")
const WorkoutLogDetailView = () => import("@/features/workout/routes/WorkoutLogDetailView.vue")

export const HOME = "home"
export const WORKOUT = "workout"
export const SETTINGS = "settings"

export const privatePaths = [
  {
    path: "/workout",
    name: "WORKOUT_HOME",
    component: WorkoutHomeView
  },
  {
    path: "/workout/log",
    name: "WORKOUT_LOG_OVERVIEW",
    component: WorkoutLogOverviewView
  },
  {
    path: "/workout/log/:logid",
    name: "WORKOUT_LOG_DETAIL",
    component: WorkoutLogDetailView
  },
  {
    path: "/program",
    name: "PROGRAM_HOME",
    component: ProgramHomeView
  },
  {
    path: "/settings",
    name: SETTINGS,
    component: HomeProtectedView
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
