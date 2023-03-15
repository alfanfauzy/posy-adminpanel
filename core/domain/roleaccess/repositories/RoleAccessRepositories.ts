/**
 * CREATE
 */

import { FormRoleAccess } from '../models'
import { ResultMutation } from '@/domain/vo/BaseResponse'

export type CreateRoleAccessResult = ResultMutation<undefined>

export interface CreateRoleAccessRepository extends CreateRoleAccessResult {
  createRoleAccess(params: FormRoleAccess): void
}
