import {GetLinkedBankAccountResponse} from '@/data/bank/types';
import {PayloadGetLinkedBankAccount} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import Get from 'api/get';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

export const GetLinkedBankAccount = async (
	params: PayloadGetLinkedBankAccount,
): Promise<Response<GetLinkedBankAccountResponse>> => {
	try {
		const response = await Get({
			endpoint: `/api/fnb-payment-service/internal/bank/get-account-info/${params}`,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetLinkedBankAccountQuery = (
	params: PayloadGetLinkedBankAccount,
	options?: UseQueryOptions<Response<GetLinkedBankAccountResponse>>,
) =>
	useQuery<Response<GetLinkedBankAccountResponse>>(
		['linked-bank-account', JSON.stringify(params)],
		() => GetLinkedBankAccount(params),
		{
			...options,
		},
	);
