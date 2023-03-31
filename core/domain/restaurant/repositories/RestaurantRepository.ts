import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {
	Datalist,
	ResultMutation,
	ResultQuery,
	UpdateParams,
} from '@/domain/vo/BaseResponse';

import {FormBodyPayload, Restaurant, Restaurants} from '../models';

/**
 * GET
 */

export type GetFilterRestaurantInput = FilterInputVariables<
	'created_at',
	keyof Pick<Restaurant, 'email' | 'uuid'>
>;

export type GetRestaurantsResult = ResultQuery<
	Datalist<Restaurants> | undefined
> & {
	pagination: Pagination | undefined;
};

export type GetRestaurantResult = ResultQuery<Restaurant>;

/**
 * GET DETAIL RESTAURANT
 */

export type GetDetailRestaurantsResult = ResultQuery<
	Datalist<Restaurants> | undefined
>;
/**
 * CREATE
 */

export type CreateRestaurantResult = ResultMutation<Restaurant | undefined>;

export type CreateRestaurantRepository = {
	createRestaurant(payload: FormBodyPayload): void;
} & CreateRestaurantResult;

/**
 * UPDATE
 */

export type UpdateRestaurantParams = UpdateParams<FormBodyPayload>;

export type UpdateRestaurantResult = ResultMutation<Restaurant>;

export type UpdateRestaurantRepository = {
	updateRestaurant(payload: UpdateRestaurantParams): void;
} & UpdateRestaurantResult;

/**
 * DELETE
 */

export type DeleteRestaurantInput = string;

export type DeleteRestaurantResult = ResultMutation<Restaurant>;

export type DeleteRestaurantRepository = {
	deleteRestaurant(payload: DeleteRestaurantInput): void;
} & DeleteRestaurantResult;
