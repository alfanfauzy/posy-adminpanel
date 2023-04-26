import {LogoutResponse} from '@/data/auth/types';
import {ResultMutation} from '@/domain/vo/BaseResponse';

import {LoginBased, LogoutPayload, PostLoginPayload} from '../models';

/**
 * POST
 */

export type PostLoginInput = PostLoginPayload;

export type PostLoginResult = ResultMutation<LoginBased | undefined>;

export type PostLoginRepository = {
	loginPost(payload: PostLoginPayload): void;
} & PostLoginResult;

/**
 * Logout
 */

export type PostLogoutInput = LogoutPayload;

export type PostLogoutResult = ResultMutation<LogoutResponse | undefined>;

export type PostLogoutRepository = {
	logout(payload: LogoutPayload): void;
} & PostLogoutResult;
