import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {
	PaymentAccountInfo,
	PaymentMethodCategory,
	PaymentMethodCategoryPayload,
	PaymentMethodCategorys,
} from '@/domain/payment/models';
import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {ResultMutation, ResultQuery} from '@/domain/vo/BaseResponse';

/**
 * GET
 */

export type GetFilterPaymentMethodCategory = FilterInputVariables<
	'created_at',
	| keyof Pick<PaymentMethodCategory, 'is_integration' | 'is_show'>
	| 'with_payment_method'
> & {restaurant_uuid?: string};

export type GetPaymentMethodCategorysResult = ResultQuery<
	PaymentMethodCategorys | undefined
> & {
	pagination: Pagination | undefined;
};

export type GetPaymentMethodCategoryResult = ResultQuery<PaymentMethodCategory>;

/**
 * UPDATE
 */

export type UpdatePaymentMethodCategoryParams = PaymentMethodCategoryPayload;

export type UpdatePaymentMethodCategoryResult =
	ResultMutation<UpdatePaymentMethodCategoryResponse>;

export type UpdatePaymentMethodCategoryRepository = {
	updatePaymentMethodCategory(payload: UpdatePaymentMethodCategoryParams): void;
} & UpdatePaymentMethodCategoryResult;

/**
 * Get Payment Account Info
 */
export type GetPaymentAccountInfoResult = ResultQuery<
	PaymentAccountInfo | undefined
>;
