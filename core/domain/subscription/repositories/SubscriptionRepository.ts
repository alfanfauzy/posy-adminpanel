import {
	FormSubscription,
	Subscription,
	Subscriptions,
} from 'core/domain/subscription/models';
import {FilterInputVariables} from 'core/domain/vo/BaseInput';
import {Pagination} from 'core/domain/vo/BasePagination';
import {
	Datalist,
	ResultQuery,
	ResultMutation,
	UpdateParams,
} from 'core/domain/vo/BaseResponse';

/**
 * GET
 */
export type GetSubscriptionFilterInput = FilterInputVariables<
	'created_at',
	keyof Pick<Subscription, 'name'>
>;

export type GetSubscriptionsResult = ResultQuery<Subscriptions | undefined> & {
	pagination: Pagination | undefined;
};

export type GetSubscriptionResult = ResultQuery<Subscription>;

/**
 * CREATE
 */

export type CreateSubscriptionResult = ResultMutation<Subscription | undefined>;

export type CreateSubscriptionRepository = {
	createSubscription(params: FormSubscription): void;
} & CreateSubscriptionResult;

/**
 * UPDATE
 */

export type UpdateSubscriptionParams = UpdateParams<FormSubscription>;

export type UpdateSubscriptionResult = ResultMutation<Subscription>;

export type UpdateSubscriptionRepository = {
	updateSubscription(params: UpdateSubscriptionParams): void;
} & UpdateSubscriptionResult;

/**
 * DELETE
 */

export type DeleteSubscriptionParams = string;

export type DeleteSubscriptionResult = ResultMutation<Subscription>;

export type DeleteSubscriptionRepository = {
	deleteSubscription(params: DeleteSubscriptionParams): void;
} & DeleteSubscriptionResult;
