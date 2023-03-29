import {useGetAccessUsecase} from '@/data/access/usecases/GetAccessUsecase';
import {
	GetAccessFilterInput,
	GetAccesssResult,
} from '@/domain/access/repositories/AccessRepository';

export const useGetAccessViewModal = (
	input: GetAccessFilterInput,
): GetAccesssResult => {
	const result = useGetAccessUsecase(input);

	return result;
};
