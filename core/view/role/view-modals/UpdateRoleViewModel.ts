import {UpdateRoleResponse} from '@/data/role/types';
import {useUpdateRoleUsecase} from '@/data/role/usecases/UpdateRoleUsecase';
import {UpdateRoleRepository} from 'core/domain/role/repositories/RoleRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useUpdateRolesViewModal = (
	options?: MutationOptions<UpdateRoleResponse>,
): UpdateRoleRepository => {
	const result = useUpdateRoleUsecase(options);

	return result;
};
