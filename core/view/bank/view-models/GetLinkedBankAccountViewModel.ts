import {GetLinkedBankAccountResponse} from '@/data/bank/types';
import {useGetLinkedBankUsecase} from '@/data/bank/usecases/GetLinkedBankUsecase';
import {
	GetLinkedBankResult,
	PayloadGetLinkedBankAccount,
} from '@/domain/bank/repositories/BankRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetLinkedBankAccountViewModel = (
	params: PayloadGetLinkedBankAccount,
	options?: UseQueryOptions<Response<GetLinkedBankAccountResponse>>,
): GetLinkedBankResult => {
	const result = useGetLinkedBankUsecase(params, options);

	return result;
};
