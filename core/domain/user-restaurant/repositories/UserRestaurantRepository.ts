import { FormUserRestaurant, UserRestaurant, UserRestaurants } from '../models'
import { Pagination } from 'core/domain/vo/BasePagination'
import { FilterInputVariables } from 'core/domain/vo/BaseInput'
import {
  Datalist,
  ResultQuery,
  ResultMutation,
  UpdateParams,
} from 'core/domain/vo/BaseResponse'

/**
 * GET
 */
export type GetUserRestaurantFilterInput = FilterInputVariables<
  'created_at',
  keyof Pick<UserRestaurant, 'name'>
>

export type GetUserRestaurantsResult = ResultQuery<
  Datalist<UserRestaurants> | undefined
> & {
  pagination: Pagination | undefined
}

export type GetUserRestaurantResult = ResultQuery<UserRestaurant>

/**
 * CREATE
 */

export type CreateUserRestaurantResult = ResultMutation<
  UserRestaurant | undefined
>

export interface CreateUserRestaurantRepository
  extends CreateUserRestaurantResult {
  createUserRestaurant(params: FormUserRestaurant): void
}

/**
 * UPDATE
 */

export type FormUpdateUserRestaurant = Omit<
  FormUserRestaurant,
  'role_uuid' | 'outlet_uuid'
>

export type UpdateUserRestaurantParams = UpdateParams<FormUpdateUserRestaurant>

export type UpdateUserRestaurantResult = ResultMutation<UserRestaurant>

export interface UpdateUserRestaurantRepository
  extends UpdateUserRestaurantResult {
  updateUserRestaurant(params: UpdateUserRestaurantParams): void
}

/**
 * DELETE
 */

export type DeleteUserRestaurantParams = string

export type DeleteUserRestaurantResult = ResultMutation<UserRestaurant>

export interface DeleteUserRestaurantRepository
  extends DeleteUserRestaurantResult {
  deleteUserRestaurant(params: DeleteUserRestaurantParams): void
}
