import { loadStripe } from '@stripe/stripe-js'

import api from '../../api'

const stripePromise = loadStripe(process.env.STRIPE_KEY)

export async function login({ commit }, { email, password }) {
  try {
    const { data } = await api.logInGetToken(email, password)
    commit('updateToken', data.access_token)
    commit('updateLoginErrors', [], false)

    this.$router.push('/')
  } catch (e) {
    commit('updateLoginErrors', [e.response?.data.detail || e.message], false)
  }
}

export async function logout({ commit }) {
  commit('updateToken', null)
  commit('updateUser', null)
  this.$router.push('/login')
}

export async function createCheckoutSession({ commit, state }) {
  try {
    const stripe = await stripePromise
    const {
      data: { sessionId }
    } = await api.createCheckoutSession(state.token)

    stripe.redirectToCheckout({ sessionId })
  } catch (e) {
    commit(
      'updateLoginErrors',
      [e.response?.data.error.message || e.message],
      false
    )
  }
}

export async function register({ commit }, data) {
  try {
    await api.register(data)
    commit('updateLoginErrors', [], false)
    await this.dispatch('global/login', data)
  } catch (e) {
    commit('updateLoginErrors', [e.response?.data.detail || e.message], false)
  }
}

export async function setUser({ commit, state }) {
  try {
    const { data } = await api.getMe(state.token)
    commit('updateUser', data)
  } catch (e) {
    commit('updateUser', null)
  }
}
