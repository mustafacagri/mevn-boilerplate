import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({ error: null, isSucess: 'null', errorTime: 5000, successTime: 5000 }),
  getters: {
    getError() {
      return this.error
    },
    getIsSuccess() {
      return this.isSucess
    }
  },
  actions: {
    setErrorClear(payload) {
      this.error = payload.error
      let time = payload.time && payload.time != undefined ? payload.time : this.errorTime
      setTimeout(() => {
        this.error = null
      }, time)
    },

    setIsSuccessClear(payload) {
      try {
        this.error = null
        this.isSucess = payload?.message || null
        const time = payload?.time ? payload.time : this.successTime

        setTimeout(() => {
          this.isSucess = null
        }, time)
      } catch (error) {
        this.setErrorClear({ error })
      }
    },
    setIsSuccess(payload) {
      try {
        this.error = null
        this.setIsSuccessClear(payload)
      } catch (error) {
        this.setErrorClear({ error })
      }
    },

    setError(payload) {
      try {
        this.isSucess = null
        this.setErrorClear(payload)
      } catch (error) {
        this.setErrorClear({ error })
      }
    }
  }
})
