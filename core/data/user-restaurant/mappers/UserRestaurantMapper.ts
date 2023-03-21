import { GetUserRestaurantResponse } from '../types'
import { UserRestaurants } from '@/domain/user-restaurant/models'

export const mapToUserRestaurantModel = (
  datas: GetUserRestaurantResponse[],
): UserRestaurants =>
  datas.map((data) => ({
    uuid: data.uuid,
    name: data.fullname,
    email: data.email,
    outlet: data.restaurant_user,
    phone: data.phone,
    role: data.role,
    seconds: data.metadata.created_at.seconds,
  }))
