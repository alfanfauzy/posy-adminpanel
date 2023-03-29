import {useGetProvinceUsecase} from '@/data/region/usecases/GetProvincUsecases';
import {
	GetFilterProvinceInput,
	GetProvinceResult,
} from '@/domain/region/repository/RegionRepositories';

export const useGetProvinceViewModal = (
	input?: GetFilterProvinceInput,
): GetProvinceResult => {
	const result = useGetProvinceUsecase(input);

	return result;
};
