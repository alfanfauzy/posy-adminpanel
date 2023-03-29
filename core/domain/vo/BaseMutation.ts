import {Response} from '@/domain/vo/BaseResponse';
import {UseMutationOptions} from 'react-query';

export type MutationOptions<TData, TVariables = unknown> = UseMutationOptions<
	Response<TData>,
	unknown,
	TVariables,
	unknown
>;
