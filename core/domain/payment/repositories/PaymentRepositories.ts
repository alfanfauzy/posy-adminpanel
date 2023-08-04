import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {
	PaymentAccountInfo,
	PaymentMethod,
	PaymentMethodCategory,
	PaymentMethodCategoryByRestaurantPayload,
	PaymentMethodCategoryPayload,
	PaymentMethodCategorys,
	PaymentMethods,
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

export type UpdatePaymentMethodCategoryParams =
	PaymentMethodCategoryByRestaurantPayload;

export type UpdatePaymentMethodCategoryResult =
	ResultMutation<UpdatePaymentMethodCategoryResponse>;

export type UpdatePaymentMethodCategoryByRestaurantRepository = {
	updatePaymentMethodCategory(payload: UpdatePaymentMethodCategoryParams): void;
} & UpdatePaymentMethodCategoryResult;

export type UpdatePaymentMethodCategoryRepository = {
	updatePaymentMethodCategory(payload: PaymentMethodCategoryPayload): void;
} & UpdatePaymentMethodCategoryResult;

/**
 * Get Payment Account Info
 */
export type GetPaymentAccountInfoResult = ResultQuery<
	PaymentAccountInfo | undefined
>;

/**
 * Get Payment Method
 */

export type PayloadPaymentMethod = {
	restaurant_uuid: string;
	payload: GetFilterPaymentMethod;
};

export type GetFilterPaymentMethod = FilterInputVariables<
	'created_at',
	| keyof Pick<PaymentMethod, 'is_integration' | 'is_show'>
	| 'with_payment_method'
	| 'restaurant_uuid'
	| 'show_for_pos'
	| 'show_for_dm'
>;

export type GetPaymentMethodsResult = ResultQuery<PaymentMethods | undefined>;

export type GetPaymentMethodResult = ResultQuery<PaymentMethod>;
