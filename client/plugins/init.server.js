import { useGlobalStateStore } from '@/store/globalState'

const initServer = async () => {
  const globalStateStore = useGlobalStateStore()
  globalStateStore.init()
}

export default initServer
