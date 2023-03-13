/** GET ROLE */
import { Metadata } from '@/domain/vo/BaseMetadata'

export interface GetSubscriptionListDataResponse {
  uuid: string
  subscription_name: string
  period: number
  price: number
  description: string
  metadata: Metadata
}

export interface CreateSubscriptionResponse {
  code: number
  data: {
    uuid: string
    metadata: Metadata
  }
}

export type UpdateSubscriptionResponse = CreateSubscriptionResponse

export type DeleteSubscriptionResponse = CreateSubscriptionResponse
