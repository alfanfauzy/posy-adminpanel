import {DeleteOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {MutationOptions} from 'core/domain/vo/BaseMutation';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {ErrorType} from 'types/index';

import {Response} from '../../../domain/vo/BaseResponse';
import {DeleteOutletResponse} from '../type';

export const DeleteOutletService = async (
	uuid: DeleteOutletInput,
): Promise<Response<DeleteOutletResponse>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/outlet/delete/${uuid}`,
			payload: {},
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useDeleteOutletMutation = (
	options?: MutationOptions<DeleteOutletResponse>,
) =>
	useMutation({
		mutationFn: (payload: DeleteOutletInput) => DeleteOutletService(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
