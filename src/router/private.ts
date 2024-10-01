import MainLayout from "@/components/Layouts/MainLayout.vue"

const ProgramHomeView = () => import("@/features/program/routes/ProgramHomeView.vue")

const WorkoutHomeView = () => import("@/features/workout/routes/WorkoutHomeView.vue")
const WorkoutLogOverviewView = () => import("@/features/workout/routes/WorkoutLogOverviewView.vue")
const WorkoutLogDetailView = () => import("@/features/workout/routes/WorkoutLogDetailView.vue")

const ProfileView = () => import("@/features/profile/routes/ProfileView.vue")

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
    path: "/profile",
    name: "PROFILE",
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
