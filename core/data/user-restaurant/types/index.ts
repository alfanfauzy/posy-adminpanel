import { GetRoleListDataResponse } from 'core/data/role/types/index'
/**
 * This File is docomentation type of response from the server
 */

import { Metadata } from '@/domain/vo/BaseMetadata'

/** GET USER RESTAURANT */

export interface RestaurantObject {
  outlet_uuid: string
  outlet_name: string
  outlet_code: string
  restaurant_uuid: string
  restaurant_name: string
  restaurant_code: string
}

export interface GetUserRestaurantResponse {
  uuid: string
  email: string
  fullname: string
  phone: string
  role: Pick<GetRoleListDataResponse, 'is_internal' | 'accesses'>
  metadata: Metadata
  restaurant_user: RestaurantObject[]
}

export interface CreateUserRestaurantResponse {
  code: number
  data: {
    uuid: string
    metadata: Metadata
  }
}

export type UpdateUserRestaurantResponse = CreateUserRestaurantResponse

export type DeleteUserRestaurantResponse = CreateUserRestaurantResponse
