import { useQuery } from "@tanstack/vue-query"

import { axios } from "@/lib/axios"
import type { ExtractFnReturnType, QueryConfig } from "@/lib/vue-query"

import type { ExercisesResponse } from "@/features/exercise/types"

export const getExercises = (): Promise<ExercisesResponse> => {
  return axios.get(`/api/v1/exercises`)
}

type QueryFnType = typeof getExercises

type UseExercisesOptions = {
  config?: QueryConfig<QueryFnType>
}
export const useExercises = ({ config }: UseExercisesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
    select: (data) => {
      return data.exercises.map((muscleGroup) => ({
        ...muscleGroup,
        exercises: muscleGroup.exercises.map((exercise) => ({
          ...exercise,
          subExercisesHidden:
            exercise.subExercises && exercise.subExercises.length > 0 ? true : false
        }))
      }))
    }
  })
}
