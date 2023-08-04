import {
	GetOrdersInput,
	GetOrdersResult,
} from '@/domain/order/repositories/GetOrdersRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToOrdersModel} from '../mappers/OrderMapper';
import {useGetOrdersQuery} from '../sources/GetOrdersQuery';
import {GetOrdersDataResponse} from '../types';

export const useGetOrdersUsecase = (
	input: GetOrdersInput,
	options?: UseQueryOptions<Response<Datalist<GetOrdersDataResponse>>>,
): GetOrdersResult => {
	const {data, ...rest} = useGetOrdersQuery(input, options);

	if (data?.data?.objs) {
		const dataMapper = mapToOrdersModel(data.data.objs);

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
