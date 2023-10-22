import { useMessageStore } from '@/store/message'
import { useUserStore } from '@/store/user'

async function request(type, pureUrl, params = {}, time = null) {
  const baseUrl = import.meta.env.VITE_API_ENDPOINT
  const url = baseUrl + pureUrl
  const { token } = localStorage

  const headers = {
    'x-access-token': token,
    'content-type': 'application/json'
  }

  let options = {
    params,
    headers,
    method: type?.toUpperCase() || 'GET'
  }

  if (['post', 'put', 'patch'].includes(type)) {
    options.body = params
  }

  // const { data } = await useAsyncData('data', () => $fetch(url))
  const { data, error } = await useFetch(url, { ...options })

  if (!data?.value) {
    useMessageStore().setError({ error: 'Something has been happened?!', time })
  } else {
    const message = data.value?.message || ''

    if (!data.value?.isSuccess) {
      useMessageStore().setError({ error: message, time })
    } else {
      useMessageStore().setIsSuccess({ message, time })

      return data?.value?.data
    }
  }
}

export { request }
