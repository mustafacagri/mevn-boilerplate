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
      this.checkLocalToken()
    },
    async checkLocalToken() {
      if (process.client) {
        const { token } = localStorage

        if (token) {
          this.token = token

          await request('get', 'user/test/user').then(res => {
            if (res) {
              this.user = { ...res }

              return 'true'
            } else {
              this.token = ''
              this.user = {}
              localStorage.removeItem('token')
              localStorage.removeItem('user')

              return 'false'
            }
          })
        }
      }
    },
    async login(payload) {
      request('post', 'auth/signin', payload).then(res => {
        if (res) {
          this.user = { ...res }
          localStorage.setItem(user, JSON.stringify(this.user))

          if (res?.accessToken) {
            localStorage.setItem(token, JSON.stringify(res.accessToken))
            this.token = res.accessToken
          }
        }
      })
    }
  }
})
