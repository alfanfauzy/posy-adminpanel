import {useGetRolesUsecase} from 'core/data/role/usecases/GetRolesUsecase';
import {
	GetRolesInput,
	GetRolesResult,
} from 'core/domain/role/repositories/RoleRepository';

export const useGetRolesViewModal = (input?: GetRolesInput): GetRolesResult => {
	const result = useGetRolesUsecase(input);

	return result;
};
