import {FilterInputVariables} from 'core/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultQuery,
	ResultMutation,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

import {Access, Accesss, FormAccess} from '../models';

/**
 * GET
 */
export type GetAccessFilterInput = FilterInputVariables<
	'created_at',
	keyof Pick<Access, 'name' | 'is_internal'>
>;

export type GetAccesssResult = ResultQuery<Datalist<Accesss> | undefined> & {
	pagination: Pagination | undefined;
};

export type GetAccessResult = ResultQuery<Access>;

/**
 * CREATE
 */

export type CreateAccessResult = ResultMutation<Access | undefined>;

export type CreateAccessRepository = {
	createAccess(params: FormAccess): void;
} & CreateAccessResult;

/**
 * UPDATE
 */

export type UpdateAccessParams = UpdateParams<FormAccess>;

export type UpdateAccessResult = ResultMutation<Access>;

export type UpdateAccessRepository = {
	updateAccess(params: UpdateAccessParams): void;
} & UpdateAccessResult;

/**
 * DELETE
 */

export type DeleteAccessParams = string;

export type DeleteAccessResult = ResultMutation<Access>;

export type DeleteAccessRepository = {
	deleteAccess(params: DeleteAccessParams): void;
} & DeleteAccessResult;
