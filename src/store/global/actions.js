import { loadStripe } from '@stripe/stripe-js'

import api from '../../api'

const stripePromise = loadStripe(process.env.STRIPE_KEY)

export async function login({ commit }, { email, password }) {
  try {
    const { data } = await api.logInGetToken(email, password)
    await commit('updateToken', data.access_token)
    await commit('updateLoginErrors', [], false)

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

export async function updateFavourites({ commit, state }, coinId) {
  try {
    // make copy of state
    const user = JSON.parse(JSON.stringify(state.user))
    const currentFavourites = JSON.parse(user.favourites)

    if (currentFavourites.find(id => id === coinId)) {
      user.favourites = JSON.stringify(
        currentFavourites.filter(id => id !== coinId)
      )
    } else {
      const updated = [...currentFavourites, coinId]
      user.favourites = JSON.stringify(updated)
    }

    // update state with new favourites
    const { data } = await api.updateUser(state.token, user)
    commit('updateUser', data)
  } catch (e) {
    // TODO: Handle error with toast or other
    console.log(e)
  }
}

export async function updatePushSubscription({ commit, state }, subscription) {
  try {
    // make copy of user from state
    const user = JSON.parse(JSON.stringify(state.user))

    user.push_subscription = JSON.stringify(subscription)

    // update user & state
    const { data } = await api.updateUser(state.token, user)
    commit('updateUser', data)
  } catch (e) {
    // TODO: Handle error with toast or other
    console.log(e)
  }
}
