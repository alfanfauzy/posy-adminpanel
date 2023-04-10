import {
	GetDistrictResult,
	GetFilterDistrictInput,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToDistrictModel} from '../mappers/RegionMapper';
import {useGetDistricesQuery} from '../sources/GetDistrictQuery';
import {GetDistrictList} from '../type';

export const useGetDistrictUsecase = (
	input?: GetFilterDistrictInput,
	options?: UseQueryOptions<Response<Datalist<GetDistrictList>>>,
): GetDistrictResult => {
	const {data, ...rest} = useGetDistricesQuery(input, options);

	if (data?.data.objs) {
		const districtMapper = mapToDistrictModel(data.data.objs);

		return {
			data: districtMapper,
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
