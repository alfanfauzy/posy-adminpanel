import {useGetCategoryUsecase} from '@/data/category/usecases/GetCetegoryUsecase';
import {
	GetCategorysResult,
	GetFilterCategoryInput,
} from '@/domain/category/repositories/CategoryRepository';

export const useGetCategoryViewModal = (
	input: GetFilterCategoryInput,
): GetCategorysResult => {
	const result = useGetCategoryUsecase(input);

	return result;
};
