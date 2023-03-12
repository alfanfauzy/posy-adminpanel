/* eslint-disable import/no-cycle */
import { AxiosError } from 'axios'
import { Response } from 'shared/baseResponse'
import { LoginDataResponse } from 'shared'
import Post from 'api/post'

interface LoginPayload {
  email: string
  password: string
}

interface RefreshTokenPayload {
  user_uuid: string
  token: string
  refresh_token: string
}

export const Login = async (
  payload: LoginPayload,
): Promise<Response<LoginDataResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/internal/auth/login`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}

export const HandleRefreshTokenLogin = async (
  payload: RefreshTokenPayload,
): Promise<Response<LoginDataResponse>> => {
  try {
    const response = await Post({
      endpoint: `/api/fnb-user-service/refresh-token`,
      payload,
    })

    return response
  } catch (error) {
    const err = error as AxiosError
    throw err.response?.data
  }
}
