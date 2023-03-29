import {UpdateCategoryParams} from '@/domain/category/repositories/CategoryRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useUpdateCategoryMutation} from '../sources/UpdateCategoryQuery';
import {UpdateCategoryResponse} from '../types';

export const useUpdateCategoryUsecase = (
	options?: MutationOptions<UpdateCategoryResponse>,
): any => {
	const {mutate, data, ...rest} = useUpdateCategoryMutation(options);

	const updateCategory = (payload: UpdateCategoryParams) => {
		mutate(payload);
	};

	return {
		updateCategory,
		data: data?.data.data,
		...rest,
	};
};
