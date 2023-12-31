import {DeleteOutletInput} from '@/domain/outlet/repositories/OutletRepositories';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

import {useDeleteOutletMutation} from '../sources/DeleteOutletQuery';
import {DeleteOutletResponse} from '../type';

export const useDeleteOutletUsecase = (
	options?: MutationOptions<DeleteOutletResponse>,
): any => {
	const {mutate, data, ...rest} = useDeleteOutletMutation(options);

	const deleteOutlet = (payload: DeleteOutletInput) => {
		mutate(payload);
	};

	return {
		deleteOutlet,
		data: data?.data.data,
		...rest,
	};
};
