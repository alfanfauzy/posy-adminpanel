import {FilterInputVariables} from 'core/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultQuery,
	ResultMutation,
} from 'core/domain/vo/BaseResponse';

import {
	FormUserSubscriptionRenew,
	UserSubscription,
	UserSubscriptions,
} from '../models';

/**
 * GET
 */
export type GetUserSubscriptionFilterInput = FilterInputVariables<
	'created_at',
	keyof Pick<UserSubscription, 'rest_id'>
>;

export type GetUserSubscriptionsResult = ResultQuery<
	Datalist<UserSubscriptions> | undefined
> & {
	pagination: Pagination | undefined;
};

export type GetUserSubscriptionResult = ResultQuery<UserSubscription>;

/**
 * CREATE
 */

export type CreateUserSubscriptionResult = ResultMutation<
	UserSubscription | undefined
>;

export type CreateUserSubscriptionRepository = {
	createUserSubscriptionRenew(params: FormUserSubscriptionRenew): void;
} & CreateUserSubscriptionResult;
