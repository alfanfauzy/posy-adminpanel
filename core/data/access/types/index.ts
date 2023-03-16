import { Metadata } from '@/domain/vo/BaseMetadata'

export interface GetAccessListDataResponse {
  uuid: string
  name: string
  description: string
  key: string
  is_internal: boolean
  metadata: Metadata
}

export interface CreateAccessResponse {
  code: number
  data: {
    uuid: string
    metadata: Metadata
  }
}

export type UpdateAccessResponse = CreateAccessResponse
export type DeleteAccessResponse = CreateAccessResponse
