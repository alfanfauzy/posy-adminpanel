import {
	FormRoleEntities,
	FormtEditRoleEntities,
} from '@/organisms/form/role/entities';
import {Role, Roles} from 'core/domain/role/models';
import {FilterInputVariables} from 'core/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultQuery,
	ResultMutation,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

/**
 * GET
 */
export type GetRolesInput = FilterInputVariables<
	'created_at',
	keyof Pick<Role, 'name' | 'is_internal'>
>;

export type GetRolesResult = ResultQuery<Datalist<Roles> | undefined> & {
	pagination: Pagination | undefined;
};

export type GetRoleResult = ResultQuery<Role>;

/**
 * CREATE
 */

export type CreateRoleResult = ResultMutation<Role | undefined>;

export type CreateRoleRepository = {
	createRole(params: FormRoleEntities): void;
} & CreateRoleResult;

/**
 * UPDATE
 */

export type UpdateRoleParams = UpdateParams<FormtEditRoleEntities>;

export type UpdateRoleResult = ResultMutation<Role>;

export type UpdateRoleRepository = {
	updateRole(params: UpdateRoleParams): void;
} & UpdateRoleResult;

/**
 * DELETE
 */

export type DeleteRoleParams = string;

export type DeleteRoleResult = ResultMutation<Role>;

export type DeleteRoleRepository = {
	deleteRole(params: DeleteRoleParams): void;
} & DeleteRoleResult;
