/**
 * CREATE
 */

import {ResultMutation} from '@/domain/vo/BaseResponse';

import {FormRoleAccess} from '../models';

export type CreateRoleAccessResult = ResultMutation<undefined>;

export type CreateRoleAccessRepository = {
	createRoleAccess(params: FormRoleAccess): void;
} & CreateRoleAccessResult;
