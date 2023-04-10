import {GetCityList} from '@/data/region/type';
import {useGetCityUsecase} from '@/data/region/usecases/GerCityUsecases';
import {
	GetCityResult,
	GetFilterCityInput,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetCityViewModal = (
	input?: GetFilterCityInput,
	options?: UseQueryOptions<Response<Datalist<GetCityList>>>,
): GetCityResult => {
	const result = useGetCityUsecase(input, options);

	return result;
};
