export type UserSubscriptionBased = {
	sub_history_id: string;
	sub_id: string;
	sub_name: string;
	rest_id: string;
	rest_name: string;
	start_date: number;
	end_date: number;
};

export type UserSubscriptions = Array<UserSubscriptionBased>;

export type UserSubscription = UserSubscriptionBased;

export type FormUserSubscriptionRenew = {
	restaurant_uuid: string;
	subscription_uuid: string;
	start_date: number;
};
