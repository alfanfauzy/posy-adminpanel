import {GetDownloadTransactionReportInput} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import {MutationOptions} from '@/domain/vo/BaseMutation';
import {Response} from '@/domain/vo/BaseResponse';
import axios from 'axios';
import {useMutation} from 'react-query';
import {toast} from 'react-toastify';
import {store} from 'store/index';
import {ErrorType} from 'types/index';

export const GetTransactionReportsQueryKey =
	'transaction-reports/download' as const;

const GetDownloadTransactionReports = async (
	input: GetDownloadTransactionReportInput,
): Promise<Response<string>> => {
	const {token} = store.getState().auth.authData;

	const response = await axios.post(
		`/api/fnb-order-service/internal/report/transaction/export`,
		input,
		{
			headers: {
				token,
			},
			responseType: 'arraybuffer',
		},
	);

	return {
		code: response?.status,
		data: response.data,
		message: response?.statusText,
		more_info: response?.statusText,
	};
};

export const useGetDownloadTransactionReportsMutation = (
	options?: MutationOptions<string>,
) =>
	useMutation({
		mutationFn: (payload: GetDownloadTransactionReportInput) =>
			GetDownloadTransactionReports(payload),
		onError(error: ErrorType) {
			toast.error(error.message);
		},
		...options,
	});
