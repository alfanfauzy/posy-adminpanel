import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultMutation,
	ResultQuery,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

import {Product, Products} from '../models';
import {FormProduct} from './../models/index';

/**
 * GET
 */

export type GetFilterProductInput = FilterInputVariables<
	'created_at',
	keyof Pick<Product, 'uuid' | 'restaurant_uuid'>
> & {restaurant_uuid: string};

export type GetProductsResult = ResultQuery<Products | undefined> & {
	pagination: Pagination | undefined;
};

export type GetFilterDetailProduct = string;
export type GetProductResult = ResultQuery<Product | undefined>;

/**
 * CREATE
 */

export type CreateProductInput = FormProduct;

export type CreateProductResult = ResultMutation<Product | undefined>;

export type CreateProductRepository = {
	createProduct(payload: CreateProductInput): void;
} & CreateProductResult;

/**
 * UPDATE
 */

export type UpdateProductParams = UpdateParams<FormProduct>;

export type UpdateProductResult = ResultMutation<Product>;

export type UpdateProductRepository = {
	updateProduct(payload: UpdateProductParams): void;
} & UpdateProductResult;
