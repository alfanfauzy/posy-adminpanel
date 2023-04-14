import {
	GetAccessFilterInput,
	GetAccesssResult,
} from '@/domain/access/repositories/AccessRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToAccessModel} from '../mappers/AccessMapper';
import {useGetAccessQuery} from '../sources/GetAccessQuery';
import {GetAccessListDataResponse} from '../types';

export const useGetAccessUsecase = (
	input: GetAccessFilterInput,
	options?: UseQueryOptions<Response<Datalist<GetAccessListDataResponse>>>,
): GetAccesssResult => {
	const {data, ...rest} = useGetAccessQuery(input, options);

	if (data?.data.objs) {
		const accessMapper = mapToAccessModel(data.data.objs);

		return {
			data: accessMapper,
			pagination: {
				curr_page: data.data.curr_page,
				per_page: data.data.per_page,
				total_objs: data.data.total_objs,
				total_page: data.data.total_page,
			},
			...rest,
		};
	}

	return {
		data: [],
		pagination: undefined,
		...rest,
	};
};
