import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {
	PaymentMethodCategory,
	PaymentMethodCategoryPayload,
	PaymentMethodCategorys,
} from '@/domain/payment/models';
import {FilterInputVariables} from '@/domain/vo/BaseInput';
import {Pagination} from '@/domain/vo/BasePagination';
import {
	ResultMutation,
	ResultQuery,
	UpdateParams,
} from '@/domain/vo/BaseResponse';

/**
 * GET
 */

export type GetFilterPaymentMethodCategory = FilterInputVariables<
	'created_at',
	| keyof Pick<PaymentMethodCategory, 'is_integration' | 'is_show'>
	| 'with_payment_method'
>;

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
