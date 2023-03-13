import { Access, Accesss, FormAccess } from '../models'
import { Pagination } from 'core/domain/vo/BasePagination'
import { FilterInputVariables } from 'core/domain/vo/BaseInput'
import {
  Datalist,
  ResultQuery,
  ResultMutation,
  UpdateParams,
} from 'core/domain/vo/BaseResponse'

/**
 * GET
 */
export type GetAccessFilterInput = FilterInputVariables<
  'created_at',
  keyof Pick<Access, 'name'>
>

export type GetAccesssResult = ResultQuery<Datalist<Accesss> | undefined> & {
  pagination: Pagination | undefined
}

export type GetAccessResult = ResultQuery<Access>

/**
 * CREATE
 */

export type CreateAccessResult = ResultMutation<Access | undefined>

export interface CreateAccessRepository extends CreateAccessResult {
  createAccess(params: FormAccess): void
}

/**
 * UPDATE
 */

export type UpdateAccessParams = UpdateParams<FormAccess>

export type UpdateAccessResult = ResultMutation<Access>

export interface UpdateAccessRepository extends UpdateAccessResult {
  updateAccess(params: UpdateAccessParams): void
}

/**
 * DELETE
 */

export type DeleteAccessParams = string

export type DeleteAccessResult = ResultMutation<Access>

export interface DeleteAccessRepository extends DeleteAccessResult {
  deleteAccess(params: DeleteAccessParams): void
}
