import {GetAdminListDataResponse} from '@/data/admin/types';
import {useGetAdminUsecase} from '@/data/admin/usecases/GetAdminsUsecase';
import {
	GetAdminsResult,
	GetFilterAdminInput,
} from '@/domain/admin/repositories/AdminRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetAdminViewModal = (
	input: GetFilterAdminInput,
	options?: UseQueryOptions<Response<Datalist<GetAdminListDataResponse>>>,
): GetAdminsResult => {
	const result = useGetAdminUsecase(input, options);

	return result;
};
