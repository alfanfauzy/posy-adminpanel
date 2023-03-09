import { Datalist, Result } from 'core/domain/vo/BaseResponse'
import { Admin } from 'core/domain/admin/models'
import { Pagination } from 'core/domain/vo/BasePagination'
import { FilterInputVariables } from '@/domain/vo/BaseInput'

/**
 * GET
 */

export type GetFilterAdminInput = FilterInputVariables<
  'created_at',
  keyof Pick<Admin, 'name'>
>

export type GetAdminsResult = Result<Datalist<Admin> | undefined> & {
  pagination: Pagination | undefined
}

export type GetAdminResult = Result<Admin>
