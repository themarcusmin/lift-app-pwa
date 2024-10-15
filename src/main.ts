import { createApp } from "vue"
import { createHead } from "@unhead/vue"
import { createPinia } from "pinia"
import { VueQueryPlugin } from "@tanstack/vue-query"
import type { VueQueryPluginOptions } from "@tanstack/vue-query"

import App from "./App.vue"
import router from "./router"

import "./style.css"

const app = createApp(App)
const head = createHead()

// VueQueryPlugin
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        // useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false
      }
    }
  }
}

app.use(head)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount("#app")
