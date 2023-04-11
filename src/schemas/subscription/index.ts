import {z} from 'zod';

export const SubscriptionFormSchema = z.object({
	subscription_name: z.string().min(3),
	period: z.object({label: z.string(), value: z.number()}),
	price: z.string().nonempty({message: 'This field cannot be empty'}),
	description: z.string().optional(),
});
