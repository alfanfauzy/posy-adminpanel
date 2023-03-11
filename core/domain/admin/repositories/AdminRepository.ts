import {
  Datalist,
  ResultMutation,
  ResultQuery,
} from 'core/domain/vo/BaseResponse'
import { Admin, FormAdmin } from 'core/domain/admin/models'
import { Pagination } from 'core/domain/vo/BasePagination'
import { FilterInputVariables, ParamsPayload } from '@/domain/vo/BaseInput'

/**
 * GET
 */

export type GetFilterAdminInput = FilterInputVariables<
  'created_at',
  keyof Pick<Admin, 'email'>
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

export type UpdateParams = {
  id: string
  params: {
    fullname: string
    role_uuid: string
  }
}

export type UpdateAdminResult = ResultMutation<Admin>

export interface UpdateAdminRepository extends UpdateAdminResult {
  updateAdmin(payload: UpdateParams): void
}

/**
 * DELETE
 */

export type DeleteAdminInput = string

export type DeleteAdminResult = ResultMutation<Admin>

export interface DeleteAdminRepository extends DeleteAdminResult {
  deleteAdmin(payload: DeleteAdminInput): void
}
