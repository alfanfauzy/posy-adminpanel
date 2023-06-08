import {GetPaymentAccountInfoResponse} from '@/data/payment/types/index';
import {Response} from '@/domain/vo/BaseResponse';
import Get from 'api/get';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

export const GetPaymentAccountInfo = async (
	restaurantID: string,
): Promise<Response<GetPaymentAccountInfoResponse>> => {
	try {
		const response = await Get({
			endpoint: `/api/fnb-payment-service/internal/payment-account/get-info/${restaurantID}
            `,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentAccountInfoQuery = (
	restaurantID: string,
	options?: UseQueryOptions<Response<GetPaymentAccountInfoResponse>>,
) =>
	useQuery<Response<GetPaymentAccountInfoResponse>>(
		['payment-account-info', JSON.stringify(restaurantID)],
		() => GetPaymentAccountInfo(restaurantID),
		{
			enabled: !!JSON.stringify(restaurantID),
			...options,
		},
	);
