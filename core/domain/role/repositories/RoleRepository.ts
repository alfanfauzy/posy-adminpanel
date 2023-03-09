import { Pagination } from 'core/domain/vo/BasePagination'
import { Role, Roles } from 'core/domain/role/models'
import { FilterInputVariables } from 'core/domain/vo/BaseInput'
import { Datalist, Result, ResultMutation } from 'core/domain/vo/BaseResponse'

/**
 * GET
 */
export type GetRolesInput = FilterInputVariables<
  'created_at',
  keyof Pick<Role, 'name'>
>

export type GetRolesResult = Result<Datalist<Roles> | undefined> & {
  pagination: Pagination | undefined
}

export type GetRoleResult = Result<Role>

/**
 * CREATE
 */

export type CreateRoleResult = ResultMutation<Role | undefined>

export interface CreateRoleRepository extends CreateRoleResult {
  createRole(): void
}

/**
 * UPDATE
 */

export type UpdateRoleInput = {
  id: string
  payload: object
}

export type UpdateRoleResult = ResultMutation<Role>

export interface UpdateRoleRepository extends UpdateRoleResult {
  updateRole(): void
}

/**
 * DELETE
 */

export type DeleteRoleInput = {
  id: string
}

export type DeleteRoleResult = Result<Role>

export interface DeleteRoleRepository extends DeleteRoleResult {
  deleteRole(): void
}
