/* eslint-disable import/no-cycle */
import { AxiosError } from 'axios'
import axios from 'api/index'
import { BaseResponseDatList, Params, Response } from 'shared/baseResponse'
import { FormRoleEntities } from '@/organisms/form/role/entities'
import { RoleResponse, RoleListData } from 'types/role'

export const GetRoleService = async (
  params: Params,
): Promise<Response<BaseResponseDatList<RoleListData>>> => {
  try {
    const response = await axios.post<
      Response<BaseResponseDatList<RoleListData>>
    >(`/api/fnb-user-service/internal/role/get-list`, params)

    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const AddRoleService = async (
  payload: FormRoleEntities,
): Promise<Response<RoleResponse>> => {
  try {
    const response = await axios.post(
      `/api/fnb-user-service/internal/role/create`,
      payload,
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

interface UpdateRoleServiceProps {
  uuid: string
  payload: FormRoleEntities
}

export const UpdateRoleService = async ({
  uuid,
  payload,
}: UpdateRoleServiceProps): Promise<Response<RoleListData>> => {
  try {
    const response = await axios.post(
      `/api/fnb-user-service/internal/role/update/${uuid}`,
      payload,
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const DeleteRoleService = async (
  uuid: string,
): Promise<Response<RoleListData>> => {
  try {
    const response = await axios.post(
      `/api/fnb-user-service/internal/role/delete/${uuid}`,
      {},
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
