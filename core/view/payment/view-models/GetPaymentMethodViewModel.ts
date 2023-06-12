import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {useGetPaymentMethodUsecase} from '@/data/payment/usecases/GetPaymentMethodUsecases';
import {
	GetFilterPaymentMethod,
	GetPaymentMethodsResult,
} from '@/domain/payment/repositories/PaymentRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetPaymentMethodViewModal = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<Datalist<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const result = useGetPaymentMethodUsecase(input, options);

	return result;
};
