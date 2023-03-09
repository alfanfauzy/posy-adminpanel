/** GET ROLE */
import { Metadata } from '@/data/common/types/BaseMetadata'

export interface GetRoleListDataResponse {
  uuid: string
  name: string
  description: string
  is_internal: boolean
  metadata: Metadata
}

export interface CreateRoleResponse {
  code: number
  data: {
    uuid: string
    metadata: Metadata
  }
}

export type UpdateRoleResponse = CreateRoleResponse
