/* eslint-disable no-param-reassign */
import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios'
// eslint-disable-next-line import/no-cycle
import { HandleRefreshTokenLogin } from 'services/login'
import { store } from 'store/index'
import { authSuccess } from 'store/slice/auth'

let isRefreshing = false
const pendingRequest: any = []

function onTokenRefreshed(token: string) {
  pendingRequest.filter((cb: any) => cb(token))
}

function addPendingRequest(callback: (token: string) => void) {
  pendingRequest.push(callback)
}

const { token, refresh_token, uuid } = store.getState().authData

const axiosApiInstance = axios.create()

// Request interceptor for API calls

axiosApiInstance.interceptors.request.use(
  async (config: any) => {
    if (token) {
      config.headers = {
        token,
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    const originalRequest = config
    const statusCode = response.status

    if (statusCode !== 401) {
      return Promise.reject(error)
    }

    if (!isRefreshing) {
      isRefreshing = true

      const payload = {
        user_uuid: uuid,
        token,
        refresh_token,
      }

      const responseRefreshToken = await HandleRefreshTokenLogin(payload).catch(
        (err) => Promise.reject(err),
      )

      if (responseRefreshToken.code === 200) {
        isRefreshing = false

        store.dispatch(authSuccess(responseRefreshToken.data))

        onTokenRefreshed(responseRefreshToken.data.token)
      }
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addPendingRequest(async (newToken: string) => {
        originalRequest.headers = {
          ...originalRequest.headers,
          newToken,
        }
        resolve(axiosApiInstance(originalRequest))
      })
    })

    return retryOriginalRequest
  },
)

export default axiosApiInstance
