import axios, { AxiosError, AxiosResponse } from 'axios'

const requestHeader = {
  'Content-Type': 'application/json',
}

const instance = axios.create({
  headers: requestHeader,
})

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    throw error
  },
)

export default instance
