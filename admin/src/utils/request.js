import axios from 'axios'
import { useMessageStore } from '@/store'

const request = async (type, pureUrl, params = {}, time = null) => {
  const checkResponse = async data => {
    return data
      .then(res => {
        if (!res?.data) {
          useMessageStore().setErrorClear({ error: 'Something has been happened?!' })
        } else {
          const { message } = res.data

          if (res.data?.isSuccess === true) {
            useMessageStore().setIsSuccess({ message, time })
          } else {
            useMessageStore().setErrorClear({ error: message, time })
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

  const headers = {
    // crossdomain: true,
    'x-access-token': token,
    'content-type': contentType,
  }

  let options = {
    params,
    headers,
  }

  const response = ['get', 'delete'].includes(type) ? axios[type](url, options) : axios[type](url, params, { headers })

  const checkedResponse = await checkResponse(response)
  if (checkedResponse?.isSuccess) {
    // we do not return anything if the request failed since we already used useMessageStore().setError

    return checkedResponse
  }
}

export { request }
