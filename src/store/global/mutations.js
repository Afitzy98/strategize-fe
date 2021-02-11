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

export const updateIsSubscribed = (state, isSubscribed) => {
  state.isSubscribed = isSubscribed
}

export const updateSwRegistration = (state, swRegistration) => {
  state.swRegistration = swRegistration
}

export const updateHasSeenNotificationDialog = (state, hasSeen) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('hasSeenNotificationDialog', JSON.stringify(hasSeen))
  state.hasSeenNotificationDialog = hasSeen
}
