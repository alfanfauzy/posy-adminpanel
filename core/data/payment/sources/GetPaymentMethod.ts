import {GetPaymentMethodListResponse} from '@/data/payment/types/index';
import {GetFilterPaymentMethod} from '@/domain/payment/repositories/PaymentRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

export const GetPaymentMethod = async (
	input?: GetFilterPaymentMethod,
): Promise<Response<Datalist<GetPaymentMethodListResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/internal/payment/method/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetPaymentMethodQuery = (
	input?: GetFilterPaymentMethod,
	options?: UseQueryOptions<Response<Datalist<GetPaymentMethodListResponse>>>,
) =>
	useQuery<Response<Datalist<GetPaymentMethodListResponse>>>(
		['payment-method/list', JSON.stringify(input)],
		() => GetPaymentMethod(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
