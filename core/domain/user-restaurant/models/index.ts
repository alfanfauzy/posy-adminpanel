/**
 * This File is docomentation type which can be used to describe to the variables in view
 */

export interface UserRestaurantBased {
  uuid: string
  name: string
  email: string
  phone: string
  role: string
  outlet: string
  seconds: number
}

export type UserRestaurant = UserRestaurantBased

export type UserRestaurants = UserRestaurantBased[]

export interface FormUserRestaurant {
  email: string
  password: string
  fullname: string
  phone: string
  role_uuid: string
  outlet_uuid: string
}
