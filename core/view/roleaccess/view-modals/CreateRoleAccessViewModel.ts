import {CreateRoleAccessResponse} from '@/data/roleaccess/types';
import {useCreateRoleAccessUsecase} from '@/data/roleaccess/usecases/CreateRoleAccessUsecase';
import {CreateRoleAccessRepository} from '@/domain/roleaccess/repositories/RoleAccessRepositories';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateRoleAccessViewModal = (
	options: MutationOptions<CreateRoleAccessResponse>,
): CreateRoleAccessRepository => {
	const result = useCreateRoleAccessUsecase(options);

	return result;
};
