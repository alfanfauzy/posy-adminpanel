/** GET ROLE */
import {Metadata} from '@/domain/vo/BaseMetadata';

export type GetSubscriptionListDataResponse = {
	uuid: string;
	subscription_name: string;
	period: number;
	price: number;
	description: string;
	metadata: Metadata;
};

export type CreateSubscriptionResponse = {
	code: number;
	data: {
		uuid: string;
		metadata: Metadata;
	};
};

export type UpdateSubscriptionResponse = CreateSubscriptionResponse;

export type DeleteSubscriptionResponse = CreateSubscriptionResponse;
