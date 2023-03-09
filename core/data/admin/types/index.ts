import { Metadata } from '@/data/common/types/BaseMetadata'

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
  metadata: Metadata
}
