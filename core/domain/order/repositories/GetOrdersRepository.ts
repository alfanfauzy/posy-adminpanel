import {Orders} from '@/domain/order/model';
import {ResultQuery} from '@/domain/vo/BaseResponse';

export type GetOrdersInput = {transaction_uuid: string; show_cancel?: boolean};

export type GetOrdersResult = ResultQuery<Orders | undefined>;
