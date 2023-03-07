import { Pagination } from 'core/domain/vo/BasePagination'
import { Role, Roles } from 'core/domain/role/models'
import { FilterInputVariables } from 'core/domain/vo/BaseInput'
import { Datalist, Result } from 'core/domain/vo/BaseResponse'

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

export type CreateRoleInput = {
  id: string
}

export type CreateRoleResult = Result<Role>

export interface CreateRoleRepository {
  AddRoleService(input: CreateRoleInput): Promise<CreateRoleResult>
}

/**
 * UPDATE
 */

export type UpdateRoleInput = {
  id: string
  payload: object
}

export type UpdateRoleResult = Result<Role>

export interface UpdateRoleRepository {
  UpdateRoleService(input: UpdateRoleInput): Promise<UpdateRoleResult>
}

/**
 * DELETE
 */

export type DeleteRoleInput = {
  id: string
}

export type DeleteRoleResult = Result<Role>

export interface DeleteRoleRepository {
  DeleteRoleService(input: DeleteRoleInput): Promise<DeleteRoleResult>
}
