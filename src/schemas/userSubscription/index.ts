import {z} from 'zod';

export const UserSubscriptionFormSchema = z.object({
	restaurant_uuid: z.object({label: z.string(), value: z.string()}),
	subscription_uuid: z.object({label: z.string(), value: z.string()}),
	start_date: z.string().min(3, {message: 'Field Start Date is required'}),
});
