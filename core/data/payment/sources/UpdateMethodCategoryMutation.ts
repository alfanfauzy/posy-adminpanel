import {UpdatePaymentMethodCategoryResponse} from '@/data/payment/types';
import {PaymentMethodCategoryPayload} from '@/domain/payment/models';
import {Response} from '@/domain/vo/BaseResponse';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

export const UpdatePaymentMethodCategoryService = async (
	payload: PaymentMethodCategoryPayload,
): Promise<Response<UpdatePaymentMethodCategoryResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-order-service/internal/payment-method/update/status`,
			payload,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useUpdatePaymentMethodCategoryMutation = (
	options?: MutationOptions<UpdatePaymentMethodCategoryResponse>,
) =>
	useMutation({
		mutationFn: (payload: PaymentMethodCategoryPayload) =>
			UpdatePaymentMethodCategoryService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
