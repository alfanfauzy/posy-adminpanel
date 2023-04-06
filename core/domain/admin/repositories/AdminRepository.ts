import {FilterInputVariables, ParamsPayload} from '@/domain/vo/BaseInput';
import {FormEditAdminEntities} from '@/organisms/form/admin/entities';
import {Admin, Admins, FormAdmin} from 'core/domain/admin/models';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultMutation,
	ResultQuery,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

/**
 * GET
 */

export type GetFilterAdminInput = FilterInputVariables<
	'created_at',
	keyof Pick<Admin, 'email' | 'is_admin'>
>;

export type GetAdminsResult = ResultQuery<Admins | undefined> & {
	pagination: Pagination | undefined;
};

export type GetAdminResult = ResultQuery<Admin>;

/**
 * CREATE
 */

export type CreateAdminInput = ParamsPayload;

export type CreateAdminResult = ResultMutation<Admin | undefined>;

export type CreateAdminRepository = {
	createAdmin(payload: FormAdmin): void;
} & CreateAdminResult;

/**
 * UPDATE
 */

export type UpdateAdminParams = UpdateParams<FormEditAdminEntities>;

export type UpdateAdminResult = ResultMutation<Admin>;

export type UpdateAdminRepository = {
	updateAdmin(payload: UpdateAdminParams): void;
} & UpdateAdminResult;

/**
 * DELETE
 */

export type DeleteAdminInput = string;

export type DeleteAdminResult = ResultMutation<Admin>;

export type DeleteAdminRepository = {
	deleteAdmin(payload: DeleteAdminInput): void;
} & DeleteAdminResult;
