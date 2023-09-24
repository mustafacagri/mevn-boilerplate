import { request } from '@/utils'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import jwt_decode from 'jwt-decode'

export const useUserStore = defineStore('user', {
  state: () =>
    reactive({
      user: {},
      token: '',
      users: [],
      roles: [],
    }),
  getters: {
    getUser() {
      return this.user
    },
    getUsers() {
      return this.users
    },
    getRoles() {
      return this.roles
    },
  },
  actions: {
    init() {
      this.isAdmin()
      this.setUsers()
      this.setRoles()
      this.setToken()
    },
    isAdmin() {
      return request('get', 'admin/check').then(res => {
        return res?.isSuccess || false
      })
    },
    setToken() {
      const { token } = localStorage

      if (token) {
        this.token = token

        const decoded = jwt_decode(token)
        const { id } = decoded

        if (id) {
          this.setUser(id) // fetch the user's info and store them
        }
      }
    },
    async setUsers() {
      await request('get', 'admin/users').then(res => {
        if (res?.data) {
          this.users = [...res.data]
        }
      })
    },
    async setUser(id) {
      await request('get', 'admin/users/' + id).then(res => {
        if (res?.data) {
          this.user = { ...res.data }
        }
      })
    },
    async setRoles() {
      await request('get', 'admin/users/roles').then(res => {
        if (res?.data) {
          this.roles = [...res.data]
        }
      })
    },
    getRolesByIds(roles) {
      return this.roles.filter(role => roles.includes(role._id))
    },
    async updateUser(payload) {
      await request('put', `admin/users/${payload._id}`, { ...payload }, 20000).then(res => {
        if (res?.data) {
          let found = this.users.find(user => user._id === payload._id)

          if (found) {
            const { username, email, isActive, roles } = payload

            found.username = username
            found.email = email
            found.isActive = isActive
            found.roles = this.getRolesByIds(roles)
          }
        }
      })
    },
    async removeUser(payload) {
      await request('delete', `admin/users/${payload._id}`, { ...payload }).then(res => {
        if (res?.data) {
          this.users = this.users.filter(user => user._id !== payload?._id)
        }
      })
    },
  },
})
