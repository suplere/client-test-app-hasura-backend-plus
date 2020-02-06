import {
  getInstance
} from '../boot/nhost'
import {
  Notify
} from 'quasar'

export const authGuard = (to, from, next) => {
  const authService = getInstance()

  const fn = () => {
    // console.log('authService.isAuthenticated', authService.isAuthenticated)
    if (authService.isAuthenticated) {
      return next()
    }

    Notify.create('You must be logged in for view this page!')
    next('/login')
  }
  // If loading has already finished, check our auth state using `fn()`
  // console.log('authService.loading', authService.loading)
  if (!authService.loading) {
    return fn()
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch('loading', loading => {
    if (loading === false) {
      return fn()
    }
  })
}
