import {
	GetCityResult,
	GetFilterCityInput,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToCityModel} from '../mappers/RegionMapper';
import {useGetCityQuery} from '../sources/GetCityQuery';
import {GetCityList} from '../type';

export const useGetCityUsecase = (
	input?: GetFilterCityInput,
	options?: UseQueryOptions<Response<Datalist<GetCityList>>>,
): GetCityResult => {
	const {data, ...rest} = useGetCityQuery(input, options);

	if (data?.data.objs) {
		const cityMapper = mapToCityModel(data.data.objs);

		return {
			data: cityMapper,
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
