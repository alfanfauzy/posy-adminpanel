import Post from 'api/post';
import {AxiosError} from 'axios';
import {GetAccessFilterInput} from 'core/domain/access/repositories/AccessRepository';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetAccessListDataResponse} from '../types';

export const GetAccess = async (
	input: GetAccessFilterInput,
): Promise<Response<Datalist<GetAccessListDataResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/role/access/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetAccessQuery = (
	input: GetAccessFilterInput,
	options?: UseQueryOptions<Response<Datalist<GetAccessListDataResponse>>>,
) =>
	useQuery<Response<Datalist<GetAccessListDataResponse>>>(
		['access/list', JSON.stringify(input)],
		() => GetAccess(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
