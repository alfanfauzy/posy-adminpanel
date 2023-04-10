import {GetDistrictList} from '@/data/region/type';
import {useGetDistrictUsecase} from '@/data/region/usecases/GerDistrictUsecases';
import {
	GetDistrictResult,
	GetFilterDistrictInput,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetDistrictViewModal = (
	input?: GetFilterDistrictInput,
	options?: UseQueryOptions<Response<Datalist<GetDistrictList>>>,
): GetDistrictResult => {
	const result = useGetDistrictUsecase(input, options);

	return result;
};
