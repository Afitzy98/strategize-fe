export default function() {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '' // pinned coin ids if exist else default coin ids

  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('quasarUser')) || null
      : null // pinned coin ids if exist else default coin ids

  const hasSeenNotificationDialog = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('hasSeenNotificationDialog')) || false
    : false // pinned coin ids if exist else default coin ids

  return {
    token,
    user,
    loginErrors: [],
    isSubscribed: false,
    swRegistration: null,
    hasSeenNotificationDialog
  }
}
