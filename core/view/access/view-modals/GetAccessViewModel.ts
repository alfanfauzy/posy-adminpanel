import {GetAccessListDataResponse} from '@/data/access/types';
import {useGetAccessUsecase} from '@/data/access/usecases/GetAccessUsecase';
import {
	GetAccessFilterInput,
	GetAccesssResult,
} from '@/domain/access/repositories/AccessRepository';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetAccessViewModal = (
	input: GetAccessFilterInput,
	options?: UseQueryOptions<Response<Datalist<GetAccessListDataResponse>>>,
): GetAccesssResult => {
	const result = useGetAccessUsecase(input, options);

	return result;
};
