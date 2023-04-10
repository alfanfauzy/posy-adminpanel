import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {
	GetRolesInput,
	GetRolesResult,
} from 'core/domain/role/repositories/RoleRepository';
import {UseQueryOptions} from 'react-query';

import {mapToRoleModel} from '../mappers/RoleMapper';
import {useGetRolesQuery} from '../sources/GetRoleQuery';
import {GetRoleListDataResponse} from '../types';

export const useGetRolesUsecase = (
	input: GetRolesInput,
	options?: UseQueryOptions<Response<Datalist<GetRoleListDataResponse>>>,
): GetRolesResult => {
	const {data, ...rest} = useGetRolesQuery(input, options);

	if (data?.data.objs) {
		const roleMapper = mapToRoleModel(data.data.objs);

		return {
			data: roleMapper,
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
