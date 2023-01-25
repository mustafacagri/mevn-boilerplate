import axios from 'axios'
import { useMessageStore } from '@/store'

const request = async (type, pureUrl, params = {}) => {
  const checkResponse = async data => {
    return data
      .then(res => {
        if (!res?.data) {
          useMessageStore().setError({ error: 'Something has been happened?!' })
        } else {
          if (res.data.isSuccess === false) {
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
  let contentType = 'application/json'

  const potentialFiles = ['image', 'image', 'file', 'files']
  const foundPropertyInParams = potentialFiles.find(item => Object.prototype.hasOwnProperty.call(params, item))

  if (foundPropertyInParams && !!params[foundPropertyInParams]) {
    contentType = 'multipart/form-data'
  }

  contentType = 'multipart/form-data'

  const headers = {
    // crossdomain: true,
    'x-access-token': token,
    'content-type': contentType,
  }

  let options = {
    params,
    headers,
  }

  const response = type === 'get' ? axios[type](url, options) : axios[type](url, params, { headers })

  const checkedResponse = await checkResponse(response)
  if (checkedResponse.isSuccess) {
    // we do not return anything if the request failed since we already used useMessageStore().setError

    return checkedResponse
  }
}

export { request }
