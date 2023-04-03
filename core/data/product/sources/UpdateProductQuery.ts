import {UpdateProductParams} from '@/domain/product/repositories/ProductRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {UpdateProductResponse} from '../types';

export const UpdateProductService = async (
	params: UpdateProductParams,
): Promise<Response<UpdateProductResponse>> => {
	const {id, payload} = params;

	try {
		const response = await Post({
			endpoint: `/api/fnb-product-service/internal/product/update/${id}`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdateProductMutation = (
	options?: MutationOptions<UpdateProductResponse>,
) =>
	useMutation({
		mutationFn: (payload: UpdateProductParams) => UpdateProductService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
