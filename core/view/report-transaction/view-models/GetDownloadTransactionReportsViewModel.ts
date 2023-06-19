import {useDownloadTransactionReportsUsecase} from '@/data/report-transaction/usecases/DownloadTransactionReportUsecase';
import {GetDownloadReportsRepository} from '@/domain/report-transaction/repositories/ReportTransactionRepository';
import {MutationOptions} from '@/domain/vo/BaseMutation';

export const useDownloadTransactionReportsViewModel = (
	options?: MutationOptions<string>,
): GetDownloadReportsRepository => {
	const result = useDownloadTransactionReportsUsecase(options);

	return result;
};
