import { useMessageStore } from '@/store/message'
import { useUserStore } from '@/store/user'

async function request(type, pureUrl, params = {}) {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT
  const url = baseUrl + pureUrl
  // const token = localStorage.getItem('token')
  const token = useUserStore().getToken

  const headers = {
    'x-access-token': token,
    'content-type': 'application/json'
  }

  let options = {
    params,
    headers
  }

  let returnData

  // const { data } = await useAsyncData('data', () => $fetch(url))
  const { data } = await useFetch(url)

  if (!data?.value) {
    useMessageStore().setError({ error: 'Something has been happened?!' })
  } else {
    const message = data.value?.data?.message || ''
    if (!data.value?.isSuccess) {
      useMessageStore().setError({ error: message })
    } else {
      useMessageStore().setIsSuccess({ message })

      return data?.value?.data
    }
  }
}

export { request }
