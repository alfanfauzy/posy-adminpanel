export type FormSubscriptionEntities = {
	subscription_name: string;
	period: {
		label: string;
		value: number;
	};
	price: string;
	description?: string | undefined;
};
