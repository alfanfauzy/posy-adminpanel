import {GetOutletListDataResponse} from '@/data/outlet/type';
import {useGetOutletUsecase} from '@/data/outlet/usecases/GetOutletUsecases';
import {
	GetFilterOutletInput,
	GetOutletsResult,
} from '@/domain/outlet/repositories/OutletRepositories';
import {Datalist, Response} from '@/domain/vo/BaseResponse';
import {UseQueryOptions} from 'react-query';

export const useGetOutletViewModal = (
	input?: GetFilterOutletInput,
	options?: UseQueryOptions<Response<Datalist<GetOutletListDataResponse>>>,
): GetOutletsResult => {
	const result = useGetOutletUsecase(input, options);

	return result;
};
