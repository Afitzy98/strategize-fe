import Vue from 'vue'
import axios from 'axios'

import { QUASAR_API_URL } from '../../config'

const axiosInstance = axios.create({
  baseURL: QUASAR_API_URL
})

Vue.prototype.$axios = axiosInstance
