import {GetPaymentMethodCategoryListResponse} from '@/data/payment/types';
import {useGetPaymentMethodCategoryUsecase} from '@/data/payment/usecases/GetPaymentMethodCategoryUsecases';
import {
	GetFilterPaymentMethodCategory,
	GetPaymentMethodCategorysResult,
} from '@/domain/payment/repositories/PaymentRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetPaymentMethodCategoryViewModal = (
	input?: GetFilterPaymentMethodCategory,
	options?: UseQueryOptions<
		Response<Datalist<GetPaymentMethodCategoryListResponse>>
	>,
): GetPaymentMethodCategorysResult => {
	const result = useGetPaymentMethodCategoryUsecase(input, options);

	return result;
};
