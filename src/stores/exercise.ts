import { defineStore } from "pinia"
import { useExercises } from "@/features/exercise/api/getExercises"
import { computed } from "vue"

export const useExerciseStore = defineStore("exercise", () => {
  const fetched = false
  const { data } = useExercises({
    config: { enabled: !fetched }
  })

  const exerciseListData = computed(() => data.value)

  return { exerciseListData }
})
