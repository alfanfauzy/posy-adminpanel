import {UserSubscriptions} from '@/domain/user-subscription/models';

import {GetUserSubscriptionListDataResponse} from '../types';

export const mapToUserSubscriptionModel = (
	datas: Array<GetUserSubscriptionListDataResponse>,
): UserSubscriptions =>
	datas.map(data => ({
		sub_history_id: data.subscription_history_uuid,
		sub_id: data.subscription_name,
		sub_name: data.subscription_name,
		rest_name: data.restaurant_name,
		rest_id: data.restaurant_uuid,
		start_date: data.start_date,
		end_date: data.end_date,
	}));
