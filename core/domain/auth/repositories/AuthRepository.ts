import {ResultMutation} from '@/domain/vo/BaseResponse';

import {LoginBased, PostLoginPayload} from '../models';

/**
 * POST
 */

export type PostLoginInput = PostLoginPayload;

export type PostLoginResult = ResultMutation<LoginBased | undefined>;

export type PostLoginRepository = {
	loginPost(payload: PostLoginPayload): void;
} & PostLoginResult;
