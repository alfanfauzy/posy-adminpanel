import {GetProvinceList} from '@/data/region/type';
import {useGetProvinceUsecase} from '@/data/region/usecases/GetProvincUsecases';
import {
	GetFilterProvinceInput,
	GetProvinceResult,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetProvinceViewModal = (
	input?: GetFilterProvinceInput,
	options?: UseQueryOptions<Response<Datalist<GetProvinceList>>>,
): GetProvinceResult => {
	const result = useGetProvinceUsecase(input, options);

	return result;
};
