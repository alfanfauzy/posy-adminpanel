import {FormCategory} from '@/domain/category/models';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useCreateCategoryMutation} from '../sources/CreateCategoryQuery';
import {CreateCategoryResponse} from '../types';

export const useCreateCategoryUsecase = (
	options?: MutationOptions<CreateCategoryResponse>,
): any => {
	const {mutate, data, ...rest} = useCreateCategoryMutation(options);

	const createCategory = (payload: FormCategory) => {
		mutate(payload);
	};

	return {
		createCategory,
		data: data?.data.data,
		...rest,
	};
};
