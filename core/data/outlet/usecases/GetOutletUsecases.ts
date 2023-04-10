import {
	GetFilterOutletInput,
	GetOutletsResult,
} from '@/domain/outlet/repositories/OutletRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

import {mapToOutletModel} from '../mappers/OutletMapper';
import {useGetOutletQuery} from '../sources/GetOutletQuery';
import {GetOutletListDataResponse} from '../type';

export const useGetOutletUsecase = (
	input?: GetFilterOutletInput,
	options?: UseQueryOptions<Response<Datalist<GetOutletListDataResponse>>>,
): GetOutletsResult => {
	const {data, ...rest} = useGetOutletQuery(input, options);

	if (data?.data.objs) {
		const outletMapper = mapToOutletModel(data.data.objs);

		return {
			data: outletMapper,
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
