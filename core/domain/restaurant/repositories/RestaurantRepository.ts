import { FormRestaurant, Restaurant, Restaurants } from '../models'
import { FilterInputVariables, ParamsPayload } from '@/domain/vo/BaseInput'
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

export type CreateRestaurantInput = ParamsPayload

export type CreateRestaurantResult = ResultMutation<Restaurant | undefined>

export interface CreateRestaurantRepository extends CreateRestaurantResult {
  createRestaurant(payload: FormRestaurant): void
}

/**
 * UPDATE
 */

export type UpdateRestaurantParams = UpdateParams<FormRestaurant>

export type UpdateRestaurantResult = ResultMutation<Restaurant>

export interface UpdateRestaurantRepository extends UpdateRestaurantResult {
  updateAdmin(payload: FormRestaurant): void
}

/**
 * DELETE
 */

export type DeleteRestaurantInput = string

export type DeleteRestaurantResult = ResultMutation<Restaurant>

export interface DeleteRestaurantRepository extends DeleteRestaurantResult {
  deleteAdmin(payload: DeleteRestaurantInput): void
}
