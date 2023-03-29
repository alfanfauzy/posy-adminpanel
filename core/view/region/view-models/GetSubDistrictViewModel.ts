import {useGetSubDistrictUsecase} from '@/data/region/usecases/GerSubDistrictUsecases';
import {
	GetFilterSubDistrictInput,
	GetSubDistrictResult,
} from '@/domain/region/repository/RegionRepositories';

export const useGetSubDistrictViewModal = (
	input?: GetFilterSubDistrictInput,
): GetSubDistrictResult => {
	const result = useGetSubDistrictUsecase(input);

	return result;
};
