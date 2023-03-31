/** GET ROLE */
import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetUserSubscriptionListDataResponse = {
	subscription_history_uuid: string;
	subscription_uuid: string;
	subscription_name: string;
	restaurant_uuid: string;
	restaurant_name: string;
	start_date: number;
	end_date: number;
};

export type CreateUserSubscriptionResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};
