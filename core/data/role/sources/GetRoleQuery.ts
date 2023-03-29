import Post from 'api/post';
import {AxiosError} from 'axios';
import {GetRolesInput} from 'core/domain/role/repositories/RoleRepository';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetRoleListDataResponse} from '../types';

export const GetRole = async (
	input: GetRolesInput,
): Promise<Response<Datalist<GetRoleListDataResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetRolesQuery = (
	input: any,
	options?: UseQueryOptions<Response<Datalist<GetRoleListDataResponse>>>,
) =>
	useQuery<Response<Datalist<GetRoleListDataResponse>>>(
		['role/list', input],
		() => GetRole(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
