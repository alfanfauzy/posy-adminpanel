import {ResultQuery} from '@/domain/vo/BaseResponse';

import {TransactionDetail} from '../model/GetTransactionDetailModel';

export type GetTransactionDetailResult = ResultQuery<
	TransactionDetail | undefined
>;
