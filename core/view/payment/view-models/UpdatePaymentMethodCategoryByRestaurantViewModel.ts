import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {useUpdatePaymentMethodCategoryByRestaurantUsecase} from '@/data/payment/usecases/UpdatePaymentMethodCategoryByRestaurantUsecase';
import {UpdatePaymentMethodCategoryByRestaurantRepository} from '@/domain/payment/repositories/PaymentRepositories';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdatePaymentMethodCategoryByRestaurantViewModal = (
	options?: MutationOptions<UpdatePaymentMethodCategoryResponse>,
): UpdatePaymentMethodCategoryByRestaurantRepository => {
	const result = useUpdatePaymentMethodCategoryByRestaurantUsecase(options);

	return result;
};
