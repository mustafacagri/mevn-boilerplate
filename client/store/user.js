import { request } from '@/utils/request'

export const useUserStore = defineStore('user', {
  state: () =>
    reactive({
      user: {},
      token: ''
    }),
  getters: {
    getUser: state => state.user,
    getToken: state => state.token || ''
  },
  actions: {
    async init() {
      if (process.client) {
        this.checkLocalToken()
      }
    },
    async checkLocalToken() {
      if (process.client) {
        const { token } = localStorage

        if (token) {
          await request('get', 'user/test/user').then(res => {
            if (res) {
              this.user = { ...res }
              this.token = token
              localStorage.setItem('user', JSON.stringify(this.user))
            } else {
              this.logout()
            }
          })
        }
      }
    },
    async login(payload) {
      let response = false
      await request('post', 'auth/signin', payload).then(res => {
        if (res) {
          this.user = { ...res }
          localStorage.setItem('user', JSON.stringify(this.user))

          if (res?.accessToken) {
            localStorage.setItem('token', res.accessToken)
            this.token = res.accessToken

            response = true
          }
        }
      })

      return response
    },

    async logout() {
      this.token = ''
      this.user = {}

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async signup(payload) {
      let response = false

      await request('post', 'auth/signup', payload).then(res => {
        if (res) {
          response = true
        }
      })

      return response
    }
  }
})
