interface SubExercise {
  exerciseID: number
  exerciseName: string
  format: string
}

interface Exercise {
  exerciseID: number
  exerciseName: string
  format: string
  subExercises?: SubExercise[]
  subExercisesHidden?: boolean
}

interface MuscleGroup {
  muscle: string
  exercises: Exercise[]
}

export interface ExercisesResponse {
  muscleGroups: MuscleGroup[]
}
