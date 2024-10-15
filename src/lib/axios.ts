// import Axios, { AxiosRequestConfig } from "axios"
import Axios from "axios"

import { API_URL } from "@/config"
// import { useNotificationStore } from "@/stores/notifications"
// import storage from "@/utils/storage"

// function authRequestInterceptor(config: AxiosRequestConfig) {
//   const token = storage.getToken()
//   if (token) {
//     config.headers.authorization = `${token}`
//   }
//   config.headers.Accept = "application/json"
//   return config
// }

export const axios = Axios.create({
  baseURL: API_URL
})

// axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message
    console.error({ message })

    // useNotificationStore().add({
    //   type: "error",
    //   title: "Error",
    //   message
    // })

    return Promise.reject(error)
  }
)

// axios.interceptors.request.use(
//   (config) => {
//     console.log("Base URL:", axios.defaults.baseURL) // Log the base URL
//     console.log("Full Request URL:", config.url) // Log the full request URL
//     return config
//   },
//   (error) => {
//     console.error("Request Error:", error)
//     return Promise.reject(error)
//   }
// )
