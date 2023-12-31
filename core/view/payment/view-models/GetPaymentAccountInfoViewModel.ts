import {GetPaymentAccountInfoResponse} from '@/data/payment/types';
import {useGetPaymentAccountInfoUsecase} from '@/data/payment/usecases/GetPaymentAccountInfoUsecases';
import {GetPaymentAccountInfoResult} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetPaymentAccountInfoViewModel = (
	restaurantID: string,
	options?: UseQueryOptions<Response<GetPaymentAccountInfoResponse>>,
): GetPaymentAccountInfoResult => {
	const result = useGetPaymentAccountInfoUsecase(restaurantID, options);

	return result;
};
