import {GetUserSubscriptionFilterInput} from '@/domain/user-subscription/repositories/UserSubscriptionRepository';
import Post from 'api/post';
import {AxiosError} from 'axios';
import {useQuery, UseQueryOptions} from 'react-query';

import {Datalist, Response} from '../../../domain/vo/BaseResponse';
import {GetUserSubscriptionListDataResponse} from '../types';

export const GetUserSubscription = async (
	input: GetUserSubscriptionFilterInput,
): Promise<Response<Datalist<GetUserSubscriptionListDataResponse>>> => {
	try {
		const response = await Post({
			endpoint: `/api/fnb-user-service/internal/report/subscription/list`,
			payload: input,
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		throw err.response?.data;
	}
};

export const useGetUserSubscriptionQuery = (
	input: GetUserSubscriptionFilterInput,
	options?: UseQueryOptions<
		Response<Datalist<GetUserSubscriptionListDataResponse>>
	>,
) =>
	useQuery<Response<Datalist<GetUserSubscriptionListDataResponse>>>(
		['user-subscription/list', input],
		() => GetUserSubscription(input),
		{
			enabled: !!JSON.stringify(input),
			...options,
		},
	);
