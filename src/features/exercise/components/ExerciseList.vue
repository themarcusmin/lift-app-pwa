<script setup lang="ts">
import clsx from "clsx"
import ChevronDownIcon from "@/assets/chevronDown.svg"
import ChevronUpIcon from "@/assets/chevronUp.svg"

import { storeToRefs } from "pinia"
import { useModalStore } from "@/stores/modal"

const modalStore = useModalStore()
const { showModal } = storeToRefs(modalStore)
const { closeModal } = modalStore

import { defineProps, toRefs, ref, watch, toRaw } from "vue"
import { useExercises } from "@/features/exercise/api/getExercises"

const props = defineProps({
  program: Object,
  selectedProgramDayID: [Number, null]
})

// https://colorkit.co/palette/eb3040-eb6949-eb8d27-988921-85ab71-5e8d6f-58b69e-c87499-cb4d8e/
function getCategoryBgColor(category: string) {
  switch (category) {
    case "back":
      return "bg-gradient-to-r from-vibrantAzure to-sky-400"
    case "chest":
      return "bg-gradient-to-r from-orangeRed to-orange-300"
    case "leg":
      return "bg-gradient-to-r from-yellow-500 to-amber-200"
    default:
      return "bg-gray-400" // Default color if no match
  }
}

function handleSubExercisesVisibility(exercise) {
  exercise.subExercisesHidden = !exercise.subExercisesHidden
}

function handleSelectExercise(exercise) {
  const { program, selectedProgramDayID } = toRefs(props)

  // Find the program day with the selected temp_id
  const dayToUpdate = program.value.programDay.find(
    (day) => day.temp_id === selectedProgramDayID.value
  )

  if (dayToUpdate) {
    const newExercise = {
      id: Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000, // Generate a random ID
      exerciseID: exercise.exerciseID,
      exerciseName: exercise.exerciseName,
      format: exercise.format,
      isHidden: false,
      restTime: 120,
      programEntries: []
    }

    // Push the new exercise into the programExercise array
    dayToUpdate.programExercise.push(newExercise)

    // Close the modal
    closeModal()
  }
}

const { data, isLoading } = useExercises({
  config: {
    enabled: showModal
  }
})

const exercises = ref([])

watch(
  data,
  (newData) => {
    if (newData) {
      exercises.value = JSON.parse(JSON.stringify(toRaw(newData)))
    }
  },
  { immediate: true }
)
</script>
<!-- TODO: test isloading spinner -->
<!-- <div>{{ isLoading }}</div> -->
<!-- <div>{{ data }}</div> -->

<template>
  <div
    v-for="(exerciseGroup, categoryIndex) in exercises"
    v-if="exercises.length > 0"
    :key="categoryIndex"
  >
    <div
      :class="
        clsx(
          'sticky top-[calc(3.6rem)] z-10 py-3 px-6 rounded-lg font-semibold capitalize',
          getCategoryBgColor(exerciseGroup.muscle)
        )
      "
    >
      {{ exerciseGroup.muscle }}
    </div>
    <div v-for="exercise in exerciseGroup.exercises" :key="exercise.exerciseID">
      <button
        @click="handleSelectExercise(exercise)"
        class="h-16 w-full px-6 border-b-2 border-neutral-700 flex items-center justify-between"
      >
        <div>
          {{ exercise.exerciseName }}
        </div>
        <button v-if="exercise.subExercises" @click.stop="handleSubExercisesVisibility(exercise)">
          <ChevronDownIcon v-if="exercise.subExercisesHidden" class="w-8 h-8" />
          <ChevronUpIcon v-else class="w-8 h-8" />
        </button>
      </button>
      <div
        v-if="exercise.subExercises && !exercise.subExercisesHidden"
        class="flex flex-col bg-secondaryBg"
      >
        <div
          v-for="subExercise in exercise.subExercises"
          :key="subExercise.exerciseId"
          class="py-4 px-8 border-b-2 border-neutral-700"
        >
          {{ subExercise.exerciseName }}
        </div>
      </div>
    </div>
  </div>
</template>
