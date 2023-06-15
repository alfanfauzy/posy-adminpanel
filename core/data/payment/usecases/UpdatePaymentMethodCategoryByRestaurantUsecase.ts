import {useUpdatePaymentMethodCategoryByRestaurantMutationMutation} from '@/data/payment/sources/UpdateMethodCategoryByRestaurantMutation';
import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryByRestaurantPayload} from '@/domain/payment/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdatePaymentMethodCategoryByRestaurantUsecase = (
	options?: MutationOptions<UpdatePaymentMethodCategoryResponse>,
): any => {
	const {mutate, data, ...rest} =
		useUpdatePaymentMethodCategoryByRestaurantMutationMutation(options);

	const updatePaymentMethodCategory = (
		payload: PaymentMethodCategoryByRestaurantPayload,
	) => {
		mutate(payload);
	};

	return {
		updatePaymentMethodCategory,
		data: data?.data.success,
		...rest,
	};
};
