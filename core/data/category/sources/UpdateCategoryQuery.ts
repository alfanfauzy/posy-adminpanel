import {UpdateCategoryParams} from '@/domain/category/repositories/CategoryRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {UpdateCategoryResponse} from '../types';

export const UpdateCategoryService = async (
	params: UpdateCategoryParams,
): Promise<Response<UpdateCategoryResponse>> => {
	const {id, payload} = params;

	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/category/update/${id}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdateCategoryMutation = (
	options?: MutationOptions<UpdateCategoryResponse>,
) =>
	useMutation({
		mutationFn: (payload: UpdateCategoryParams) =>
			UpdateCategoryService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
