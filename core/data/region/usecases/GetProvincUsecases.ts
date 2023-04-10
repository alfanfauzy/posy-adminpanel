import {
	GetFilterProvinceInput,
	GetProvinceResult,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToProvinceModel} from '../mappers/RegionMapper';
import {useGetProvinceQuery} from '../sources/GetProvinceQuery';
import {GetProvinceList} from '../type';

export const useGetProvinceUsecase = (
	input?: GetFilterProvinceInput,
	options?: UseQueryOptions<Response<Datalist<GetProvinceList>>>,
): GetProvinceResult => {
	const {data, ...rest} = useGetProvinceQuery(input, options);

	if (data?.data.objs) {
		const provinceMapper = mapToProvinceModel(data.data.objs);

		return {
			data: provinceMapper,
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
