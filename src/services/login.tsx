/* eslint-disable import/no-cycle */
import { SERVICE_DOMAIN } from '../constants'
import { AxiosError } from 'axios'
import axios from 'api/index'
import { Response } from 'shared/baseResponse'
import { LoginDataResponse } from 'shared'

interface LoginPayload {
  email: string
  password: string
}

export const Login = async (
  payload: LoginPayload,
): Promise<Response<LoginDataResponse>> => {
  try {
    const response = await axios.post<Response<LoginDataResponse>>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${SERVICE_DOMAIN.user}/internal/auth/login`,
      payload,
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
