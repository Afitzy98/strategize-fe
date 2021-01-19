export const updatePinnedCoinIds = (state, newPinnedCoinIds) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('pinnedCoinIds', JSON.stringify(newPinnedCoinIds))
  state.pinnedCoinIds = newPinnedCoinIds
}

export const updateUser = (state, newUser) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('quasarUser', JSON.stringify(newUser))
  state.user = newUser
}

export const updateToken = (state, newToken) => {
  typeof window !== 'undefined' && localStorage.setItem('token', newToken)

  state.token = newToken
}

export const updateLoginErrors = (state, errors) => {
  state.loginErrors = errors
}
