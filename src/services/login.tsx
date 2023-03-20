/* eslint-disable import/no-cycle */
import { AxiosError } from 'axios'
import { Response } from 'shared/baseResponse'
import Post from 'api/post'
import { DataLogin } from '@/domain/auth/models'

interface RefreshTokenPayload {
  user_uuid: string
  token: string
  refresh_token: string
}

export const HandleRefreshTokenLogin = async (
  payload: RefreshTokenPayload,
): Promise<Response<DataLogin>> => {
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
