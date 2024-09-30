import { defineStore } from "pinia"

export const useSwipeStore = defineStore("swipe", {
  state: () => ({
    isSwipeUp: true
  }),
  getters: {
    swipeAnimation: (state) => (state.isSwipeUp ? "swipe-animate-up" : "swipe-animate-down")
  },
  actions: {
    swipeUp() {
      this.isSwipeUp = true
    },
    swipeDown() {
      this.isSwipeUp = false
    }
  }
})
