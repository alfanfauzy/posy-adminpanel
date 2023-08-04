import {GetPaymentMethodListResponse} from '@/data/payment/types/index';
import {PayloadPaymentMethod} from '@/domain/payment/repositories/PaymentRepositories';
import {Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

export const GetPaymentMethod = async (
	params: PayloadPaymentMethod,
): Promise<Response<Array<GetPaymentMethodListResponse>>> => {
	const {payload, restaurant_uuid} = params;
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/v2/internal/payment-method/get-list?restaurant_uuid=${restaurant_uuid}`,
			payload: payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentMethodQuery = (
	params: PayloadPaymentMethod,
	options?: UseQueryOptions<Response<Array<GetPaymentMethodListResponse>>>,
) =>
	useQuery<Response<Array<GetPaymentMethodListResponse>>>(
		['payment-method/list', JSON.stringify(params)],
		() => GetPaymentMethod(params),
		{
			enabled: !!JSON.stringify(params),
			...options,
		},
	);
