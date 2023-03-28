import {
  Datalist,
  ResultMutation,
  ResultQuery,
  UpdateParams,
} from 'core/domain/vo/BaseResponse'
import { Admin, FormAdmin } from 'core/domain/admin/models'
import { Pagination } from 'core/domain/vo/BasePagination'
import { FilterInputVariables, ParamsPayload } from '@/domain/vo/BaseInput'
import { FormEditAdminEntities } from '@/organisms/form/admin/entities'

/**
 * GET
 */

export type GetFilterAdminInput = FilterInputVariables<
  'created_at',
  keyof Pick<Admin, 'email' | 'is_admin'>
>

export type GetAdminsResult = ResultQuery<Datalist<Admin> | undefined> & {
  pagination: Pagination | undefined
}

export type GetAdminResult = ResultQuery<Admin>

/**
 * CREATE
 */

export type CreateAdminInput = ParamsPayload

export type CreateAdminResult = ResultMutation<Admin | undefined>

export interface CreateAdminRepository extends CreateAdminResult {
  createAdmin(payload: FormAdmin): void
}

/**
 * UPDATE
 */

export type UpdateAdminParams = UpdateParams<FormEditAdminEntities>

export type UpdateAdminResult = ResultMutation<Admin>

export interface UpdateAdminRepository extends UpdateAdminResult {
  updateAdmin(payload: UpdateAdminParams): void
}

/**
 * DELETE
 */

export type DeleteAdminInput = string

export type DeleteAdminResult = ResultMutation<Admin>

export interface DeleteAdminRepository extends DeleteAdminResult {
  deleteAdmin(payload: DeleteAdminInput): void
}
