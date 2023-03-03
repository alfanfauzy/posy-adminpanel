/* eslint-disable import/no-cycle */
import { AxiosError } from 'axios'
import axios from 'api/index'
import { Response } from 'shared/baseResponse'
import { LoginDataResponse } from 'shared'

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
    const response = await axios.post<Response<LoginDataResponse>>(
      `/api/fnb-user-service/internal/auth/login`,
      payload,
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const HandleRefreshTokenLogin = async (
  payload: RefreshTokenPayload,
): Promise<Response<LoginDataResponse>> => {
  try {
    const response = await axios.post<Response<LoginDataResponse>>(
      `/api/fnb-user-service/refresh-token`,
      payload,
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
