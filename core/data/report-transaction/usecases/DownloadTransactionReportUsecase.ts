import {useGetDownloadTransactionReportsMutation} from '@/data/report-transaction/sources/DownloadTransactionReportsMutation';
import {GetDownloadTransactionReportInput} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import {MutationOptions} from 'core/domain/vo/BaseMutation';

export const useDownloadTransactionReportsUsecase = (
	options?: MutationOptions<string>,
): any => {
	const {mutate, data, ...rest} =
		useGetDownloadTransactionReportsMutation(options);

	const downloadReport = (payload: GetDownloadTransactionReportInput) => {
		mutate(payload);
	};

	return {
		downloadReport,
		data: data?.data,
		...rest,
	};
};
