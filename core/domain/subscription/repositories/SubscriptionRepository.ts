import { Pagination } from 'core/domain/vo/BasePagination'
import {
  FormSubscription,
  Subscription,
  Subscriptions,
} from 'core/domain/subscription/models'
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
export type GetSubscriptionFilterInput = FilterInputVariables<
  'created_at',
  keyof Pick<Subscription, 'name'>
>

export type GetSubscriptionsResult = ResultQuery<
  Datalist<Subscriptions> | undefined
> & {
  pagination: Pagination | undefined
}

export type GetSubscriptionResult = ResultQuery<Subscription>

/**
 * CREATE
 */

export type CreateSubscriptionResult = ResultMutation<Subscription | undefined>

export interface CreateSubscriptionRepository extends CreateSubscriptionResult {
  createSubscription(params: FormSubscription): void
}

/**
 * UPDATE
 */

export type UpdateSubscriptionParams = UpdateParams<FormSubscription>

export type UpdateSubscriptionResult = ResultMutation<Subscription>

export interface UpdateSubscriptionRepository extends UpdateSubscriptionResult {
  updateSubscription(params: UpdateSubscriptionParams): void
}

/**
 * DELETE
 */

export type DeleteSubscriptionParams = string

export type DeleteSubscriptionResult = ResultMutation<Subscription>

export interface DeleteSubscriptionRepository extends DeleteSubscriptionResult {
  deleteSubscription(params: DeleteSubscriptionParams): void
}
