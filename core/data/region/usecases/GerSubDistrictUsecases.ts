import {
	GetFilterSubDistrictInput,
	GetSubDistrictResult,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToSubDistrictModel} from '../mappers/RegionMapper';
import {useGetSubDistricesQuery} from '../sources/GetSubDistrictQuery';
import {GetSubDistrictList} from '../type';

export const useGetSubDistrictUsecase = (
	input?: GetFilterSubDistrictInput,
	options?: UseQueryOptions<Response<Datalist<GetSubDistrictList>>>,
): GetSubDistrictResult => {
	const {data, ...rest} = useGetSubDistricesQuery(input, options);

	if (data?.data.objs) {
		const cityMapper = mapToSubDistrictModel(data.data.objs);

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
