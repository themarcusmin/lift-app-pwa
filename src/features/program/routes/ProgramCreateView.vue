<script setup lang="ts">
import { ref } from "vue"
import clsx from "clsx"

import EditIcon from "@/assets/editIcon.svg"
import DeleteIcon from "@/assets/trashIcon.svg"
import ChevronDownIcon from "@/assets/chevronDown.svg"
import ChevronRightIcon from "@/assets/chevronRight.svg"
// import { ChevronDownIcon } from "@heroicons/vue/24/outline"

const programDayName = "Day 1"

const program = ref({
  programName: "Andy's Program",
  programDay: [
    {
      name: "Push Day",
      isHidden: false,
      programExercise: [
        {
          id: 111,
          exerciseID: 1,
          exerciseName: "Bench Press",
          format: "reps and weight",
          isHidden: false,
          restTime: 120,
          programEntries: [
            {
              sets: 1,
              reps: 10,
              weight: 75,
              measurement: "percentage" // or weight
            },
            {
              sets: 1,
              reps: 10,
              weight: 80,
              measurement: "percentage" // or weight
            }
          ]
        },
        {
          id: 120,
          exerciseID: 2,
          exerciseName: "Dumbbell Shoulder Press",
          format: "reps and weight",
          isHidden: true,
          restTime: 120,
          programEntries: [
            {
              sets: 1,
              reps: 10,
              weight: 75,
              measurement: "percentage" // or weight
            },
            {
              sets: 1,
              reps: 10,
              weight: 80,
              measurement: "percentage" // reps or weight
            }
          ]
        }
      ]
    },
    {
      name: "Pull Day",
      isHidden: false,
      programExercise: [
        {
          id: 111,
          exerciseID: 1,
          exerciseName: "Pull Ups",
          format: "reps",
          isHidden: false,
          restTime: 120,
          programEntries: [
            {
              sets: 1,
              reps: 10,
              weight: null,
              measurement: null // % or weight
            },
            {
              sets: 1,
              reps: 10,
              weight: null,
              measurement: null // % or weight
            }
          ]
        }
      ]
    }
  ]
})

function toggleVisibility(prop: any) {
  prop.isHidden = !prop.isHidden
}

function handleAddProgramDay() {
  // Generate the next program day name
  const dayCount = program.value.programDay.length
  const newDayName = `Day ${String.fromCharCode(65 + dayCount)}` // 65 is the ASCII code for 'A'

  // Add the new program day to the programDay array
  program.value.programDay.push({
    name: newDayName,
    isHidden: false,
    programExercise: []
  })
}

function handleAddSetGroup(dayIndex, exerciseId) {
  // Find the specified day
  const day = program.value.programDay[dayIndex]

  // Find the specified exercise
  const exercise = day.programExercise.find((ex) => ex.id === exerciseId)

  if (exercise) {
    // Get the last entry in the programEntries
    const lastEntry = exercise.programEntries[exercise.programEntries.length - 1]

    // Create a new set group based on the last entry or defaults
    const newSetGroup = {
      sets: lastEntry?.sets ?? 1, // Default to 1 set if no last entry
      reps: lastEntry?.reps ?? 10, // Default to 10 reps if no last entry
      weight: exercise.format === "reps" ? null : (lastEntry?.weight ?? 75), // Default weight if format is not "reps"
      measurement: exercise.format === "reps" ? null : (lastEntry?.measurement ?? "percentage") // Default measurement if format is not "reps"
    }

    // Push the new set group to programEntries
    exercise.programEntries.push(newSetGroup)
  } else {
    console.error("Exercise not found")
  }
}

function handleDeleteSetGroup(dayIndex, exerciseId, entryIndex) {
  // Find the specified day
  const day = program.value.programDay[dayIndex]

  // Find the specified exercise
  const exercise = day.programExercise.find((ex) => ex.id === exerciseId)

  if (exercise) {
    // Check if the setIndex is valid
    if (entryIndex >= 0 && entryIndex < exercise.programEntries.length) {
      // Remove the set at the specified index
      exercise.programEntries.splice(entryIndex, 1)
    } else {
      console.error("Invalid set index")
    }
  } else {
    console.error("Exercise not found")
  }
}

function handleDeleteProgramExercise(dayIndex, exerciseIndex) {
  program.value.programDay[dayIndex].programExercise.splice(exerciseIndex, 1)
}

function handleDeleteProgramDay(dayIndex) {
  program.value.programDay.splice(dayIndex, 1)
}
</script>

<template>
  <div class="min-h-screen z-40 overflow-hidden text-white py-12 px-6 bg-primaryBg">
    <div
      class="flex flex-col gap-4 border-b-2 border-neutral-500 focus-within:border-primaryPurple py-4"
    >
      <div>Program</div>
      <div class="flex flex-row items-center justify-between mx-4">
        <input
          type="text"
          v-model="program.programName"
          class="w-80 text-xl bg-transparent border-0 focus:ring-0"
        />
        <EditIcon class="w-5 h-5" />
      </div>
    </div>
    <div class="flex flex-col gap-4 py-4">
      <div>Program Details</div>
      <div
        v-for="(day, dayIndex) in program.programDay"
        class="flex flex-col gap-3"
        :key="dayIndex"
      >
        <div class="flex flex-row items-center justify-between mx-4">
          <div @click="toggleVisibility(day)">
            <ChevronDownIcon v-if="!day.isHidden" class="w-8 h-8" />
            <ChevronRightIcon v-else class="w-8 h-8" />
          </div>
          <input
            type="text"
            v-model="day.name"
            class="w-60 text-xl bg-transparent border-0 focus:ring-0"
          />
          <EditIcon class="w-5 h-5" />
          <DeleteIcon @click="handleDeleteProgramDay(dayIndex)" class="w-5 h-5" />
        </div>

        <div
          :class="
            clsx('bg-secondaryBg border-neutral-500 border-2 rounded-lg p-4 flex flex-col gap-4', {
              hidden: day.isHidden
            })
          "
          v-for="(exercise, exerciseIndex) in day.programExercise"
          :key="exerciseIndex"
        >
          <div class="flex justify-between pr-2 items-center">
            <div class="flex flex-row gap-3 items-center">
              <div class="text-lg">{{ exercise.exerciseName }}</div>
              <div @click="toggleVisibility(exercise)">
                <ChevronDownIcon v-if="!exercise.isHidden" class="w-8 h-8" />
                <ChevronRightIcon v-else class="w-8 h-8" />
              </div>
            </div>
            <DeleteIcon
              @click="handleDeleteProgramExercise(dayIndex, exerciseIndex)"
              class="w-5 h-5"
            />
          </div>
          <div class="flex flex-col gap-3" :class="{ hidden: exercise.isHidden }">
            <div class="text-sm flex gap-4 items-center">
              <span>Rest:</span>
              <input
                class="text-sm bg-transparent w-16 rounded-md focus:border-primaryPurple"
                type="number"
                v-model="exercise.restTime"
              />
              <span>seconds</span>
            </div>
            <div
              v-for="(entry, entryIndex) in exercise.programEntries"
              class="border-b-2 border-neutral-600 pb-4 mb-4 flex flex-col gap-2"
            >
              <div class="flex flex-row justify-between mb-2 pr-4">
                <div class="rounded-full border-2 w-6 h-6 flex items-center justify-center text-xs">
                  {{ entryIndex + 1 }}
                </div>
                <div class="w-64">Set Group</div>
                <DeleteIcon
                  @click="handleDeleteSetGroup(dayIndex, exercise.id, entryIndex)"
                  class="w-5 h-5"
                />
              </div>
              <div class="grid grid-cols-4 text-sm">
                <div>Sets</div>
                <div>Reps</div>
                <div v-if="entry.weight != null">Weight</div>
              </div>
              <div class="grid grid-cols-4 items-center">
                <input
                  class="bg-transparent w-20 rounded-md focus:border-primaryPurple"
                  v-model="entry.sets"
                />
                <input
                  class="bg-transparent w-20 rounded-md focus:border-primaryPurple"
                  v-model="entry.reps"
                />
                <div v-if="entry.weight != null">
                  <input
                    class="bg-transparent w-20 rounded-md focus:border-primaryPurple"
                    v-model="entry.weight"
                  />
                </div>
                <span v-if="entry.measurement">{{
                  entry.measurement === "percentage" ? "%" : "kg"
                }}</span>
              </div>
            </div>
            <!-- Add Set Group -->
            <button
              @click="handleAddSetGroup(dayIndex, exercise.id)"
              class="w-fit text-start text-sm text-primaryPurple font-semibold underline"
            >
              Add Set Group
            </button>
          </div>
        </div>
        <!-- Add Exercise -->
        <button
          :class="
            clsx('w-fit text-start text-sm text-primaryPurple font-semibold underline', {
              hidden: day.isHidden
            })
          "
        >
          Add Exercise
        </button>
      </div>

      <button
        @click="handleAddProgramDay"
        class="w-fit text-start text-sm text-primaryPurple font-semibold underline"
      >
        Add Day
      </button>
    </div>
    <button class="text-black bg-primaryPurple font-semibold rounded-xl h-12 w-full my-2">
      Save
    </button>
    <div class="h-24"></div>
  </div>
</template>
