import {mapToLinkedBankAccount} from '@/data/bank/mappers/BankMapper';
import {useGetLinkedBankAccountQuery} from '@/data/bank/sources/GetLinkedBankQuery';
import {GetLinkedBankAccountResponse} from '@/data/bank/types';
import {
	GetLinkedBankResult,
	PayloadGetLinkedBankAccount,
} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetLinkedBankUsecase = (
	params: PayloadGetLinkedBankAccount,
	options?: UseQueryOptions<Response<GetLinkedBankAccountResponse>>,
): GetLinkedBankResult => {
	const {data, ...rest} = useGetLinkedBankAccountQuery(params, options);
	if (data?.data) {
		const linkedBankAccountMapper = mapToLinkedBankAccount(data.data);

		return {
			data: linkedBankAccountMapper,
			...rest,
		};
	}

	return {
		data: undefined,
		...rest,
	};
};
