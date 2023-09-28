import { useUserStore } from '@/store'
const userStore = useUserStore()

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!userStore.getToken) {
    return navigateTo('/login')
  }
})
