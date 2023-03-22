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
    pic_phone: data.owner_phone,
    seconds: data.metadata.created_at.seconds,
    address: data.restaurant_address,
    code: data.restaurant_code,
    description: data.restaurant_description,
    logo: data.logo_image_url,
    subscription_uuid: data.subscription_uuid,
  }))
