import {GetFilterCityInput} from '@/domain/region/repository/RegionRepositories';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetCityList} from '../type';

export const GetCityes = async (
	input?: GetFilterCityInput,
): Promise<Response<Datalist<GetCityList>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/region/city/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetCityQuery = (
	input?: GetFilterCityInput,
	options?: UseQueryOptions<Response<Datalist<GetCityList>>>,
) =>
	useQuery<Response<Datalist<GetCityList>>>(
		['cityes/list', JSON.stringify(input)],
		() => GetCityes(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
