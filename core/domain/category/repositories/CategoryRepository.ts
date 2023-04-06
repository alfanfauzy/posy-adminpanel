import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultMutation,
	ResultQuery,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

import {Category, Categorys, FormCategory} from '../models/index';

/**
 * GET
 */

export type GetFilterCategoryInput = FilterInputVariables<
	'created_at',
	keyof Pick<Category, 'restaurant_uuid' | 'uuid' | 'is_active'>
> & {restaurant_uuid: string};

export type GetCategorysResult = ResultQuery<Categorys | undefined> & {
	pagination: Pagination | undefined;
};

export type GetCategoryResult = ResultQuery<Category>;

/**
 * CREATE
 */

export type CreateCategoryInput = FormCategory;

export type CreateCategoryResult = ResultMutation<Category | undefined>;

export type CreateCategoryRepository = {
	createCategory(payload: FormCategory): void;
} & CreateCategoryResult;

/**
 * UPDATE
 */

export type UpdateCategoryParams = UpdateParams<FormCategory>;

export type UpdateCategoryResult = ResultMutation<Category>;

export type UpdateCategoryRepository = {
	updateCategory(payload: UpdateCategoryParams): void;
} & UpdateCategoryResult;
