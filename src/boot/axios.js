import Vue from 'vue'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.QUASAR_API_URL
})

Vue.prototype.$axios = axiosInstance
