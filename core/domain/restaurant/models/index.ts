export interface RestaurantBased {
  uuid: string
  name: string
  email: string
  phone: string
  code: string
  address: string
  description: string
  logo: string
  npwp: string
  nib: string
  pic_name: string
  pic_phone: string
  seconds: number
}

export type Restaurant = RestaurantBased
export type Restaurants = RestaurantBased[]

export type FormBodyPayload = {
  restaurant_name: string
  restaurant_description: string
  restaurant_logo: string
  restaurant_code: string
  restaurant_phone: string
  restaurant_email: string
  restaurant_address: string
  nib: string
  npwp: string
  owner_name: string
  owner_phone: string
  subscription_uuid: string
  start_date: string
}

export type FormRestaurant = FormData
