import { Metadata } from '@/domain/vo/BaseMetadata'

export interface GetRestaurantListDataResponse {
  uuid: string
  restaurant_name: string
  restaurant_description: string
  restaurant_code: string
  logo_image_url: string
  restaurant_phone: string
  restaurant_email: string
  restaurant_address: string
  nib_image_url: string
  npwp_image_url: string
  owner_name: string
  owner_phone: string
  subscription_uuid: string
  metadata: Metadata
}

export interface CreateRestaurantResponse {
  code: number
  data: {
    uuid: string
    metadata: Metadata
  }
}

export type UpdateRestaurantResponse = CreateRestaurantResponse
export type DeleteRestaurantResponse = CreateRestaurantResponse
