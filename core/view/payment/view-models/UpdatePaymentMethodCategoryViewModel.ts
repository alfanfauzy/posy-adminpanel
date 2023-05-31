import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {useUpdatePaymentMethodCategoryUsecase} from '@/data/payment/usecases/UpdatePaymentMethodCategoryUsecase';
import {UpdatePaymentMethodCategoryRepository} from '@/domain/payment/repositories/PaymentRepositories';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdatePaymentMethodCategoryViewModal = (
	options?: MutationOptions<UpdatePaymentMethodCategoryResponse>,
): UpdatePaymentMethodCategoryRepository => {
	const result = useUpdatePaymentMethodCategoryUsecase(options);

	return result;
};
