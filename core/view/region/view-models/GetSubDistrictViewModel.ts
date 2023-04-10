import {GetSubDistrictList} from '@/data/region/type';
import {useGetSubDistrictUsecase} from '@/data/region/usecases/GerSubDistrictUsecases';
import {
	GetFilterSubDistrictInput,
	GetSubDistrictResult,
} from '@/domain/region/repository/RegionRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetSubDistrictViewModal = (
	input?: GetFilterSubDistrictInput,
	options?: UseQueryOptions<Response<Datalist<GetSubDistrictList>>>,
): GetSubDistrictResult => {
	const result = useGetSubDistrictUsecase(input, options);

	return result;
};
