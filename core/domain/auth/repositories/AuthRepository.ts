import { LoginBased, PostLoginPayload } from '../models'
import { ResultMutation } from '@/domain/vo/BaseResponse'

/**
 * POST
 */

export type PostLoginInput = PostLoginPayload

export type PostLoginResult = ResultMutation<LoginBased | undefined>

export interface PostLoginRepository extends PostLoginResult {
  loginPost(payload: PostLoginPayload): void
}
