import {UpdateCategoryResponse} from '@/data/category/types';
import {useUpdateCategoryUsecase} from '@/data/category/usecases/UpdateCategoryUsecase';
import {UpdateCategoryRepository} from 'core/domain/category/repositories/CategoryRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateCategoryViewModal = (
	options?: MutationOptions<UpdateCategoryResponse>,
): UpdateCategoryRepository => {
	const result = useUpdateCategoryUsecase(options);

	return result;
};
