import { FormOutlet, Outlet, Outlets } from '../models'
import {
  Datalist,
  ResultMutation,
  ResultQuery,
  UpdateParams,
} from 'core/domain/vo/BaseResponse'
import { Pagination } from 'core/domain/vo/BasePagination'
import { FilterInputVariables } from '@/domain/vo/BaseInput'

/**
 * GET
 */

export type GetFilterOutletInput = FilterInputVariables<
  'created_at',
  keyof Pick<Outlet, 'uuid' | 'restaurant_uuid'>
>

export type GetOutletsResult = ResultQuery<Datalist<Outlets> | undefined> & {
  pagination: Pagination | undefined
}

export type GetOutletResult = ResultQuery<Outlet>

/**
 * CREATE
 */

export type CreateOutletInput = FormOutlet

export type CreateOutletResult = ResultMutation<Outlet | undefined>

export interface CreateOutletRepository extends CreateOutletResult {
  createOutlet(payload: FormOutlet): void
}

/**
 * UPDATE
 */

export type UpdateOutletParams = UpdateParams<FormOutlet>

export type UpdateOutletResult = ResultMutation<Outlet>

export interface UpdateOutletRepository extends UpdateOutletResult {
  updateOutlet(payload: UpdateOutletParams): void
}

/**
 * DELETE
 */

export type DeleteOutletInput = string

export type DeleteOutletResult = ResultMutation<Outlet>

export interface DeleteOutletRepository extends DeleteOutletResult {
  deleteOutlet(payload: DeleteOutletInput): void
}
