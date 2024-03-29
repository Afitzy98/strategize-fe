import axios from 'axios'

const http = axios.create({
  baseURL: process.env.QUASAR_API_URL
})

const authHeaders = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const api = {
  async createCheckoutSession(token) {
    return http.get('/payments/create-checkout-session', authHeaders(token))
  },
  async createCustomerPortal(token) {
    return http.get('/payments/customer-portal', authHeaders(token))
  },
  async getCoin(token, coinId) {
    return http.get(`/coins/${coinId}`, authHeaders(token))
  },
  async getMe(token) {
    return http.get('/users/me', authHeaders(token))
  },
  async logInGetToken(username, password) {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    return http.post('users/token', params)
  },
  async register(data) {
    return http.post('/users', data)
  },
  async updateUser(token, data) {
    return http.put('/users', data, authHeaders(token))
  }
}

export default api
