import {useUpdatePaymentMethodCategoryMutation} from '@/data/payment/sources/UpdateMethodCategoryMutation';
import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdatePaymentMethodCategoryUsecase = (
	options?: MutationOptions<UpdatePaymentMethodCategoryResponse>,
): any => {
	const {mutate, data, ...rest} =
		useUpdatePaymentMethodCategoryMutation(options);

	const updatePaymentMethodCategory = (
		payload: PaymentMethodCategoryPayload,
	) => {
		mutate(payload);
	};

	return {
		updatePaymentMethodCategory,
		data: data?.data.success,
		...rest,
	};
};
