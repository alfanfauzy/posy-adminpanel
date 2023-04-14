import {
	GetAdminsResult,
	GetFilterAdminInput,
} from '@/domain/admin/repositories/AdminRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToAdminModel} from '../mappers/AdminMapper';
import {useGetAdminQuery} from '../sources/GetAdminQuery';
import {GetAdminListDataResponse} from '../types';

export const useGetAdminUsecase = (
	input: GetFilterAdminInput,
	options?: UseQueryOptions<Response<Datalist<GetAdminListDataResponse>>>,
): GetAdminsResult => {
	const {data, ...rest} = useGetAdminQuery(input, options);

	if (data?.data.objs) {
		const adminMapper = mapToAdminModel(data.data.objs);

		return {
			data: adminMapper,
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
		data: undefined,
		pagination: undefined,
		...rest,
	};
};
