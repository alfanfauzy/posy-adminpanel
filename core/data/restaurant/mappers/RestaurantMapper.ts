import { GetRestaurantListDataResponse } from '../types'
import { Restaurants } from '@/domain/restaurant/models'

export const mapToRestaurantModel = (
  datas: GetRestaurantListDataResponse[],
): Restaurants =>
  datas.map((data) => ({
    uuid: data.uuid,
    name: data.restaurant_name,
    email: data.restaurant_email,
    phone: data.restaurant_phone,
    nib: data.nib_image_url,
    npwp: data.npwp_image_url,
    pic_name: data.owner_name,
    pic_email: data.owner_email,
    pic_phone: data.owner_phone,
    seconds: data.metadata.created_at.seconds,
  }))
