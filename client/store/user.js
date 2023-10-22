import { request } from '@/utils/request'
import { useMessageStore } from './message'

export const useUserStore = defineStore('user', {
  state: () =>
    reactive({
      user: {},
      token: ''
    }),
  getters: {
    getUser: state => state.user,
    getUserId: state => state.user?._id || '',
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
    },

    async updatePassword(payload) {
      let response = false
      let error = ''

      if (payload?.password !== payload?.repassword) {
        error = 'Password and Re-password must be the same!'
      } else if (payload?.password.length < 5) {
        error = 'Password must be at least 5 characters!'
      }

      if (error) {
        useMessageStore().setError({ error })

        return
      }

      await request('put', 'user/update', payload).then(res => {
        if (res) {
          response = true
          this.token = res
          localStorage.setItem('token', res)
        }
      })

      return response
    },

    async activate(payload) {
      const { email, authCode } = payload
      let response = false

      await request('post', 'auth/activate', payload, 30_000).then(res => {
        if (res) {
          response = true
        }
      })

      return response
    }
  }
})
