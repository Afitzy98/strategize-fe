import { Notify } from 'quasar'

import api from '../../api'

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

export async function register({ commit }, data) {
  try {
    await api.register(data)
    commit('updateLoginErrors', [], false)
    this.dispatch('global/login', data)
  } catch (e) {
    commit('updateLoginErrors', [e.response?.data.detail || e.message], false)
  }
}

export async function setUser({ commit, state }) {
  try {
    const { data } = await api.getMe(state.token)
    commit('updateUser', data)
  } catch (e) {
    Notify({
      message: e.message,
      color: 'purple'
    })
    commit('updateUser', null)
  }
}
