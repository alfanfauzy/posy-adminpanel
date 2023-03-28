import { Metadata } from '@/domain/vo/BaseMetadata'

export interface RoleDataResponse {
  uuid: string
  name: string
  is_internal: boolean
}

export interface GetAdminListDataResponse {
  uuid: string
  email: string
  name: string
  fullname: string
  role: RoleDataResponse
  is_admin: string
  metadata: Metadata
}

export interface CreateAdminResponse {
  code: number
  data: {
    uuid: string
    metadata: Metadata
  }
}

export type UpdateAdminResponse = CreateAdminResponse
export type DeleteAdminResponse = CreateAdminResponse
