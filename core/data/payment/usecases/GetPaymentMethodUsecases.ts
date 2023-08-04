import {mapToPaymentMethod} from '@/data/payment/mappers/PaymentMethodMapper';
import {useGetPaymentMethodQuery} from '@/data/payment/sources/GetPaymentMethod';
import {GetPaymentMethodListResponse} from '@/data/payment/types';
import {
	GetPaymentMethodsResult,
	PayloadPaymentMethod,
} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetPaymentMethodUsecase = (
	input: PayloadPaymentMethod,
	options?: UseQueryOptions<Response<Array<GetPaymentMethodListResponse>>>,
): GetPaymentMethodsResult => {
	const {data, ...rest} = useGetPaymentMethodQuery(input, options);

	if (data?.data) {
		const paymentMethodMapper = mapToPaymentMethod(data.data);

		return {
			data: paymentMethodMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
