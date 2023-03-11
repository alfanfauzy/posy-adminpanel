import { Pagination } from 'core/domain/vo/BasePagination'
import { Role, Roles } from 'core/domain/role/models'
import { FilterInputVariables } from 'core/domain/vo/BaseInput'
import {
  Datalist,
  ResultQuery,
  ResultMutation,
  UpdateParams,
} from 'core/domain/vo/BaseResponse'
import {
  FormRoleEntities,
  FormtEditRoleEntities,
} from '@/organisms/form/role/entities'

/**
 * GET
 */
export type GetRolesInput = FilterInputVariables<
  'created_at',
  keyof Pick<Role, 'name'>
>

export type GetRolesResult = ResultQuery<Datalist<Roles> | undefined> & {
  pagination: Pagination | undefined
}

export type GetRoleResult = ResultQuery<Role>

/**
 * CREATE
 */

export type CreateRoleResult = ResultMutation<Role | undefined>

export interface CreateRoleRepository extends CreateRoleResult {
  createRole(params: FormRoleEntities): void
}

/**
 * UPDATE
 */

export type UpdateRoleParams = UpdateParams<FormtEditRoleEntities>

export type UpdateRoleResult = ResultMutation<Role>

export interface UpdateRoleRepository extends UpdateRoleResult {
  updateRole(params: UpdateRoleParams): void
}

/**
 * DELETE
 */

export type DeleteRoleParams = string

export type DeleteRoleResult = ResultMutation<Role>

export interface DeleteRoleRepository extends DeleteRoleResult {
  deleteRole(params: DeleteRoleParams): void
}
