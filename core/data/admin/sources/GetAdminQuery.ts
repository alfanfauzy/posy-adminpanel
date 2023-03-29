import Post from 'api/post';
import {AxiosError} from 'axios';
import {GetFilterAdminInput} from 'core/domain/admin/repositories/AdminRepository';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetAdminListDataResponse} from '../types';

export const GetAdmin = async (
	input?: GetFilterAdminInput,
): Promise<Response<Datalist<GetAdminListDataResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/user/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetAdminQuery = (
	input?: GetFilterAdminInput,
	options?: UseQueryOptions<Response<Datalist<GetAdminListDataResponse>>>,
) =>
	useQuery<Response<Datalist<GetAdminListDataResponse>>>(
		['admin/list', JSON.stringify(input)],
		() => GetAdmin(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
