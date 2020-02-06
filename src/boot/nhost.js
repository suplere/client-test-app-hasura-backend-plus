import Vue from 'vue'
import nhost from 'nhost-js-sdk/src'
import { client } from './apollo'

let instance

export const getInstance = () => instance

export const useAuth = ({
  ...options
}) => {
  if (instance) return instance
  instance = new Vue({
    data () {
      return {
        isAuthenticated: false,
        loading: true,
        nHostAuthClient: null
      }
    },
    async created () {
      options.authInitCallback = () => {
        // console.log('AFTER AUTOLOGIN', this.isAuthenticated)
        this.loading = false
      }
      nhost.initializeApp(options)
      this.nHostAuthClient = nhost.auth()
      this.nHostAuthClient.onAuthStateChanged((data) => {
        // console.log('AUTH CHANGE', data)
        if (data) {
          this.isAuthenticated = true
        } else {
          this.isAuthenticated = false
        }
      })
    },
    methods: {
      register ({ username, password }) {
        return this.nHostAuthClient.register(username, username, password)
      },
      login ({ username, password }) {
        // console.log('LOGIN: ', username, password)
        return this.nHostAuthClient.login(username, password)
      },
      logout () {
        client.cache.data.clear()
        return this.nHostAuthClient.logout()
      },
      getClaims () {
        return this.nHostAuthClient.getClaims()
      }
    }
  })
  return instance
}

export const AuthPlugin = {
  install (Vue, options) {
    Vue.prototype.$auth = useAuth(options)
  }
}

export default ({
  Vue,
  router
}) => {
  Vue.use(AuthPlugin, {
    endpoint: process.env.BACKEND_ENDPOINT,
    appId: process.env.APP_ID
  })
}
