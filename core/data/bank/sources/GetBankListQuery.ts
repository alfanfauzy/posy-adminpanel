import {GetBankListResponse} from '@/data/bank/types';
import {Response} from '@/domain/vo/BaseResponse';
import Get from 'api/get';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

export const GetBankList = async (): Promise<
	Response<Array<GetBankListResponse>>
> => {
	try {
		const response = await Get({
			endpoint: `/api/fnb-payment-service/internal/bank/get-list`,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetBankListQuery = (
	options?: UseQueryOptions<Response<Array<GetBankListResponse>>>,
) =>
	useQuery<Response<Array<GetBankListResponse>>>(
		['bank/list'],
		() => GetBankList(),
		{
			...options,
		},
	);
