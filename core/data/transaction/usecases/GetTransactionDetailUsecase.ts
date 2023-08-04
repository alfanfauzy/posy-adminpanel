import {GetTransactionDetailResult} from '@/domain/transaction/repositories/GetTransactionDetailRepository';
import {Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToTransactionDetailModel} from '../mappers/TransactionMapper';
import {useGetTransactionDetailQuery} from '../sources/GetTransactionDetailQuery';
import {GetTransactionDetailResponse} from '../types/GetTransactionDetailType';

export const useGetTransactionDetailUsecase = (
	transaction_uuid: string,
	options?: UseQueryOptions<Response<GetTransactionDetailResponse>>,
): GetTransactionDetailResult => {
	const {data, ...rest} = useGetTransactionDetailQuery(
		transaction_uuid,
		options,
	);

	if (data?.data) {
		const dataMapper = mapToTransactionDetailModel(data.data);

		return {
			data: dataMapper,
			...rest,
		};
	}

	return {
		data: undefined,

		...rest,
	};
};
