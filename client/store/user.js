export const useUserStore = defineStore('user', {
  state: () =>
    reactive({
      user: {}
    }),
  getters: {
    getUser: state => state.user,
    getToken: state => (state.user?.token ? state.user.token : '')
  },
  actions: {
    async init() {}
  }
})
