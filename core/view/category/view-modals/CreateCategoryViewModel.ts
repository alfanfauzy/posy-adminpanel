import {CreateCategoryResponse} from '@/data/category/types';
import {useCreateCategoryUsecase} from '@/data/category/usecases/CreateCategoryUsecase';
import {CreateCategoryRepository} from '@/domain/category/repositories/CategoryRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateCategoryViewModal = (
	options?: MutationOptions<CreateCategoryResponse>,
): CreateCategoryRepository => {
	const result = useCreateCategoryUsecase(options);

	return result;
};
