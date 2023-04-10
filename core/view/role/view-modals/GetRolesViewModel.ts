import {GetRoleListDataResponse} from '@/data/role/types';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {useGetRolesUsecase} from 'core/data/role/usecases/GetRolesUsecase';
import {
	GetRolesInput,
	GetRolesResult,
} from 'core/domain/role/repositories/RoleRepository';
import {UseQueryOptions} from 'react-query';

export const useGetRolesViewModal = (
	input: GetRolesInput,
	options?: UseQueryOptions<Response<Datalist<GetRoleListDataResponse>>>,
): GetRolesResult => {
	const result = useGetRolesUsecase(input, options);

	return result;
};
