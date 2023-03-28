import {
  GetRestaurantDetailResponse,
  GetRestaurantListDataResponse,
} from '../types'
import { Restaurant, Restaurants } from '@/domain/restaurant/models'

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
    subscription_name: data.subscription_name,
  }))

export const mapToDetailRestaurantModel = (
  datas: GetRestaurantDetailResponse,
): Restaurant => ({
  uuid: datas.restaurant.uuid,
  name: datas.restaurant.restaurant_name,
  email: datas.restaurant.restaurant_email,
  phone: datas.restaurant.restaurant_phone,
  nib: datas.restaurant.nib_image_url,
  npwp: datas.restaurant.npwp_image_url,
  pic_name: datas.restaurant.owner_name,
  pic_phone: datas.restaurant.owner_phone,
  seconds: datas.restaurant.metadata.created_at.seconds,
  address: datas.restaurant.restaurant_address,
  code: datas.restaurant.restaurant_code,
  description: datas.restaurant.restaurant_description,
  logo: datas.restaurant.logo_image_url,
  subscription_uuid: datas.restaurant.subscription_uuid,
  subscription_name: datas.restaurant.subscription_name,
})
