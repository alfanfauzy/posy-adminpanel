/**
 * This File is docomentation type of response from the server
 */

import { Metadata } from '@/domain/vo/BaseMetadata'

/** GET USER RESTAURANT */

export interface GetUserRestaurantResponse {
  uuid: string
  email: string
  fullname: string
  metadata: Metadata
}
