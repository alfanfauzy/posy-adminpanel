import {
	GetFilterSubDistrictInput,
	GetSubDistrictResult,
} from '@/domain/region/repository/RegionRepositories';

import {mapToSubDistrictModel} from '../mappers/RegionMapper';
import {useGetSubDistricesQuery} from '../sources/GetSubDistrictQuery';

export const useGetSubDistrictUsecase = (
	input?: GetFilterSubDistrictInput,
): GetSubDistrictResult => {
	const {data, ...rest} = useGetSubDistricesQuery(input);

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
