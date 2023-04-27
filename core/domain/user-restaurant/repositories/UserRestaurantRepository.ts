import {RestaurantObject} from '@/data/user-restaurant/types';
import {FilterInputVariables} from 'core/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	ResultQuery,
	ResultMutation,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

import {FormUserRestaurant, UserRestaurant, UserRestaurants} from '../models';

/**
 * GET
 */
export type GetUserRestaurantFilterInput = FilterInputVariables<
	'created_at',
	| keyof Pick<UserRestaurant, 'name' | 'is_admin'>
	| keyof Pick<RestaurantObject, 'restaurant_uuid'>
>;

export type GetUserRestaurantsResult = ResultQuery<
	UserRestaurants | undefined
> & {
	pagination: Pagination | undefined;
};

export type GetUserRestaurantResult = ResultQuery<UserRestaurant>;

/**
 * CREATE
 */

export type CreateUserRestaurantResult = ResultMutation<
	UserRestaurant | undefined
>;

export type CreateUserRestaurantRepository = {
	createUserRestaurant(params: FormUserRestaurant): void;
} & CreateUserRestaurantResult;

/**
 * UPDATE
 */

export type FormUpdateUserRestaurant = Omit<
	FormUserRestaurant,
	'role_uuid' | 'outlet_uuid'
>;

export type UpdateUserRestaurantParams = UpdateParams<FormUpdateUserRestaurant>;

export type UpdateUserRestaurantResult = ResultMutation<UserRestaurant>;

export type UpdateUserRestaurantRepository = {
	updateUserRestaurant(params: UpdateUserRestaurantParams): void;
} & UpdateUserRestaurantResult;

/**
 * DELETE
 */

export type DeleteUserRestaurantParams = string;

export type DeleteUserRestaurantResult = ResultMutation<UserRestaurant>;

export type DeleteUserRestaurantRepository = {
	deleteUserRestaurant(params: DeleteUserRestaurantParams): void;
} & DeleteUserRestaurantResult;
