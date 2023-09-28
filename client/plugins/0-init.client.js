import { useGlobalStateStore } from '@/store/globalState'

export default defineNuxtPlugin(async nuxtApp => {
  const globalStateStore = useGlobalStateStore()
  globalStateStore.init()
})
