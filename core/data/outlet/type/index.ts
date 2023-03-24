import { Metadata } from '@/domain/vo/BaseMetadata'

export interface GetOutletListDataResponse {
  uuid: string
  postal_code_id: string
  restaurant_uuid: string
  outlet_name: string
  outlet_code: string
  address: string
  city: string
  phone: string
  restaurant_name: string
  created_at: { seconds: number; nanos: number }
  metadata: Metadata
}

export interface CreateOutletResponse {
  code: number
  data: {
    uuid: string
    metadata: Metadata
  }
}

export type UpdateOutletResponse = CreateOutletResponse
export type DeleteOutletResponse = CreateOutletResponse
