import { FormBodyPayload, Restaurant, Restaurants } from '../models'
import { FilterInputVariables } from '@/domain/vo/BaseInput'
import {
  Datalist,
  ResultMutation,
  ResultQuery,
  UpdateParams,
} from '@/domain/vo/BaseResponse'
import { Pagination } from '@/domain/vo/BasePagination'

/**
 * GET
 */

export type GetFilterRestaurantInput = FilterInputVariables<
  'created_at',
  keyof Pick<Restaurant, 'email'>
>

export type GetRestaurantsResult = ResultQuery<
  Datalist<Restaurants> | undefined
> & {
  pagination: Pagination | undefined
}

export type GetRestaurantResult = ResultQuery<Restaurant>

/**
 * CREATE
 */

export type CreateRestaurantResult = ResultMutation<Restaurant | undefined>

export interface CreateRestaurantRepository extends CreateRestaurantResult {
  createRestaurant(payload: FormBodyPayload): void
}

/**
 * UPDATE
 */

export type UpdateRestaurantParams = UpdateParams<FormBodyPayload>

export type UpdateRestaurantResult = ResultMutation<Restaurant>

export interface UpdateRestaurantRepository extends UpdateRestaurantResult {
  updateRestaurant(payload: UpdateRestaurantParams): void
}

/**
 * DELETE
 */

export type DeleteRestaurantInput = string

export type DeleteRestaurantResult = ResultMutation<Restaurant>

export interface DeleteRestaurantRepository extends DeleteRestaurantResult {
  deleteRestaurant(payload: DeleteRestaurantInput): void
}
