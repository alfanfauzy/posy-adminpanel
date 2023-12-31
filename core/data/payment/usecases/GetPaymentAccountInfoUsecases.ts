import {mapToPayemntAccountInfo} from '@/data/payment/mappers/PaymentMethodMapper';
import {useGetPaymentAccountInfoQuery} from '@/data/payment/sources/GetPaymentAccountInfoQuery';
import {GetPaymentAccountInfoResponse} from '@/data/payment/types';
import {GetPaymentAccountInfoResult} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetPaymentAccountInfoUsecase = (
	restaurantID: string,
	options?: UseQueryOptions<Response<GetPaymentAccountInfoResponse>>,
): GetPaymentAccountInfoResult => {
	const {data, ...rest} = useGetPaymentAccountInfoQuery(restaurantID, options);

	if (data?.data) {
		const paymentAccountInfo = mapToPayemntAccountInfo(data.data);

		return {
			data: paymentAccountInfo,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
