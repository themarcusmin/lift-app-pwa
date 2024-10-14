<script setup lang="ts">
import { defineProps } from "vue"

defineProps<{
  title: string
  customClass: string
}>()

import clsx from "clsx"
import { useModalStore } from "@/stores/modal"
import { storeToRefs } from "pinia"

const modalStore = useModalStore()
const { closeModal } = modalStore
const { showModal } = storeToRefs(modalStore)

import CloseIcon from "@/assets/closeIcon.svg"

function handleCloseModal() {
  closeModal()
}
</script>

<template>
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>
    <div :class="clsx('shadow-lg z-10', customClass)">
      <div class="py-2 px-4 flex items-center justify-between border-b-2 border-neutral-600">
        <h2 class="text-lg font-semibold text-center flex-grow">{{ title }}</h2>
        <button @click="handleCloseModal">
          <CloseIcon class="w-10 h-10" />
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
