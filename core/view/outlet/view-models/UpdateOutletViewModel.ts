import {UpdateOutletResponse} from '@/data/outlet/type';
import {useUpdateOutletUsecase} from '@/data/outlet/usecases/UpdateOutletUsecase';
import {UpdateOutletRepository} from '@/domain/outlet/repositories/OutletRepositories';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateOutletViewModal = (
	options?: MutationOptions<UpdateOutletResponse>,
): UpdateOutletRepository => {
	const result = useUpdateOutletUsecase(options);

	return result;
};
