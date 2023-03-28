import {CreateCategoryInput} from '@/domain/category/repositories/CategoryRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {CreateCategoryResponse} from '../types';

export const CreateCategoryService = async (
	payload: CreateCategoryInput,
): Promise<Response<CreateCategoryResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/category/create`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useCreateCategoryMutation = (
	options?: MutationOptions<CreateCategoryResponse>,
) =>
	useMutation({
		mutationFn: (payload: CreateCategoryInput) =>
			CreateCategoryService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
