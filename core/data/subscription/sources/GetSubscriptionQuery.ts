import {GetSubscriptionFilterInput} from '@/domain/subscription/repositories/SubscriptionRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetSubscriptionListDataResponse} from '../types';

export const GetSubscription = async (
	input: GetSubscriptionFilterInput,
): Promise<Response<Datalist<GetSubscriptionListDataResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/subscription/get-list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetSubscriptionQuery = (
	input: any,
	options?: UseQueryOptions<
		Response<Datalist<GetSubscriptionListDataResponse>>
	>,
) =>
	useQuery<Response<Datalist<GetSubscriptionListDataResponse>>>(
		['subscription/list', input],
		() => GetSubscription(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
