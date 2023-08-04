import {GetOrdersDataResponse} from '@/data/order/types';
import {useGetOrdersUsecase} from '@/data/order/usecases/GetOrdersUsecase';
import {
	GetOrdersInput,
	GetOrdersResult,
} from '@/domain/order/repositories/GetOrdersRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetOrdersViewModel = (
	input: GetOrdersInput,
	options?: UseQueryOptions<Response<Datalist<GetOrdersDataResponse>>>,
): GetOrdersResult => {
	const result = useGetOrdersUsecase(input, options);

	return result;
};
