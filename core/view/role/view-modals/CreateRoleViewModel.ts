import {CreateRoleResponse} from '@/data/role/types';
import {useCreateRoleUsecase} from '@/data/role/usecases/CreateRoleUsecase';
import {CreateRoleRepository} from 'core/domain/role/repositories/RoleRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useCreateRolesViewModal = (
	options: MutationOptions<CreateRoleResponse>,
): CreateRoleRepository => {
	const result = useCreateRoleUsecase(options);

	return result;
};
