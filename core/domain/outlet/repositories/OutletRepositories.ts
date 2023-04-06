import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultMutation,
	ResultQuery,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

import {FormOutlet, Outlet, Outlets} from '../models';

/**
 * GET
 */

export type GetFilterOutletInput = FilterInputVariables<
	'created_at',
	keyof Pick<Outlet, 'uuid' | 'restaurant_uuid'>
>;

export type GetOutletsResult = ResultQuery<Outlets | undefined> & {
	pagination: Pagination | undefined;
};

export type GetOutletResult = ResultQuery<Outlet>;

/**
 * CREATE
 */

export type CreateOutletInput = FormOutlet;

export type CreateOutletResult = ResultMutation<Outlet | undefined>;

export type CreateOutletRepository = {
	createOutlet(payload: FormOutlet): void;
} & CreateOutletResult;

/**
 * UPDATE
 */

export type UpdateOutletParams = UpdateParams<FormOutlet>;

export type UpdateOutletResult = ResultMutation<Outlet>;

export type UpdateOutletRepository = {
	updateOutlet(payload: UpdateOutletParams): void;
} & UpdateOutletResult;

/**
 * DELETE
 */

export type DeleteOutletInput = string;

export type DeleteOutletResult = ResultMutation<Outlet>;

export type DeleteOutletRepository = {
	deleteOutlet(payload: DeleteOutletInput): void;
} & DeleteOutletResult;
