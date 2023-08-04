import {GetTransactionDetailResponse} from '@/data/transaction/types/GetTransactionDetailType';
import {useGetTransactionDetailUsecase} from '@/data/transaction/usecases/GetTransactionDetailUsecase';
import {GetTransactionDetailResult} from '@/domain/transaction/repositories/GetTransactionDetailRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetTransactionDetailViewModel = (
	transaction_uuid: string,
	options?: UseQueryOptions<Response<GetTransactionDetailResponse>>,
): GetTransactionDetailResult => {
	const result = useGetTransactionDetailUsecase(transaction_uuid, options);

	return result;
};
