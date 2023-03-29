import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultMutation,
	ResultQuery,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

import {Product, Products} from '../models';

/**
 * GET
 */

export type GetFilterProductInput = FilterInputVariables<
	'created_at',
	keyof Pick<Product, 'uuid' | 'restaurant_uuid'>
> & {restaurant_uuid: string};

export type GetProductsResult = ResultQuery<Datalist<Products> | undefined> & {
	pagination: Pagination | undefined;
};

export type GetProductResult = ResultQuery<Product>;

/**
 * CREATE
 */

// export type CreateOutletInput = FormOutlet;

// export type CreateOutletResult = ResultMutation<Outlet | undefined>;

// export type CreateOutletRepository = {
// 	createOutlet(payload: FormOutlet): void;
// } & CreateOutletResult;

/**
 * UPDATE
 */

// export type UpdateOutletParams = UpdateParams<FormOutlet>;

// export type UpdateOutletResult = ResultMutation<Outlet>;

// export type UpdateOutletRepository = {
// 	updateOutlet(payload: UpdateOutletParams): void;
// } & UpdateOutletResult;
