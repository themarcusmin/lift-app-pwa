import { defineStore } from "pinia"

export const useNavStore = defineStore("nav", {
  state: () => ({
    isHidden: false
  }),
  actions: {
    hideNav() {
      this.isHidden = true
    },
    showNav() {
      this.isHidden = false
    }
  }
})
