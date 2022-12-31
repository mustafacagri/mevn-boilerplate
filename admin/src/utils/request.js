import axios from 'axios'
import { useMessageStore } from '@/store'

const request = async (type, pureUrl, params = {}) => {
  const checkResponse = async data => {
    return data
      .then(res => {
        if (!res?.data) {
          useMessageStore().setError({ error: 'Something has been happened?!' })
        } else {
          if (!res.data.isSuccess) {
            useMessageStore().setError({ error: res.data.message })
          } else {
            useMessageStore().setIsSuccess({ message: res.data.message })
          }

          return res.data
        }
      })
      .catch(error => {
        useMessageStore().setError({ error })
      })
  }

  const baseUrl = import.meta.env.VITE_API_ENDPOINT
  const url = baseUrl + pureUrl
  const token = localStorage.getItem('token')

  const headers = {
    'x-access-token': token,
    'content-type': 'application/json',
  }

  let options = {
    params,
    headers,
  }

  const response = type === 'get' ? axios[type](url, options) : axios[type](url, params, { headers })

  return await checkResponse(response)
}

export { request }
