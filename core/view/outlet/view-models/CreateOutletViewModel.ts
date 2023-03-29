import {CreateOutletResponse} from '@/data/outlet/type';
import {useCreateOutletUsecase} from '@/data/outlet/usecases/CreateOutletUsecase';
import {CreateOutletRepository} from '@/domain/outlet/repositories/OutletRepositories';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateOutletViewModal = (
	options?: MutationOptions<CreateOutletResponse>,
): CreateOutletRepository => {
	const result = useCreateOutletUsecase(options);

	return result;
};
