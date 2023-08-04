import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {useGetPaymentMethodUsecase} from '@/data/payment/usecases/GetPaymentMethodUsecases';
import {
	GetPaymentMethodsResult,
	PayloadPaymentMethod,
} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetPaymentMethodViewModal = (
	input: PayloadPaymentMethod,
	options?: UseQueryOptions<Response<Array<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const result = useGetPaymentMethodUsecase(input, options);

	return result;
};
