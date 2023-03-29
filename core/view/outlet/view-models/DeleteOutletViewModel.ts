import {DeleteOutletResponse} from '@/data/outlet/type';
import {useDeleteOutletUsecase} from '@/data/outlet/usecases/DeleteOutletUsecase';
import {DeleteOutletRepository} from '@/domain/outlet/repositories/OutletRepositories';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDeleteOutletViewModal = (
	options?: MutationOptions<DeleteOutletResponse>,
): DeleteOutletRepository => {
	const result = useDeleteOutletUsecase(options);

	return result;
};
