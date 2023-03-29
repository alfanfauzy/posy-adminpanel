import {Subscriptions} from '@/domain/subscription/models';

import {GetSubscriptionListDataResponse} from '../types';

export const mapToSubscriptionModel = (
	datas: Array<GetSubscriptionListDataResponse>,
): Subscriptions =>
	datas.map(data => ({
		uuid: data.uuid,
		name: data.subscription_name,
		period: data.period,
		price: data.price,
		seconds: data.metadata.created_at.seconds,
		description: data.description,
	}));
