import {z} from 'zod';

export const RestaurantFormSchema = z.object({
	restaurant_code: z.string().optional(),
	restaurant_name: z
		.string()
		.min(3, {message: 'Restaurant Name must contain at least 3 character(s)'}),
	restaurant_description: z.string().min(3, {
		message: 'Restaurant Description must contain at least 3 character(s)',
	}),
	restaurant_logo_url: z.string().optional(),
	nib_url: z.string().optional(),
	npwp_url: z.string().optional(),
	restaurant_phone: z.string().min(7).max(13),
	restaurant_email: z.string().email('This is not a valid email format'),
	restaurant_address: z.string().min(3, {
		message: 'Restaurant Address must contain at least 3 character(s)',
	}),
	owner_name: z
		.string()
		.min(3, {message: 'Owner Name must contain at least 3 character(s)'}),
	owner_phone: z.string().min(7).max(13),
	subscription_uuid: z.object({value: z.string(), label: z.string()}),
	start_date: z.string().min(3, {message: 'Field Start Date is required'}),
});

export const EditRestaurantFormSchema = z.object({
	restaurant_code: z.string().min(3).optional(),
	restaurant_name: z
		.string()
		.min(3, {message: 'Restaurant Name must contain at least 3 character(s)'}),
	restaurant_description: z.string().min(3, {
		message: 'Restaurant Description must contain at least 3 character(s)',
	}),
	restaurant_logo_url: z.string().optional(),
	nib_url: z.string().optional(),
	npwp_url: z.string().optional(),
	restaurant_phone: z.string().min(7).max(13),
	restaurant_email: z.string().email('This is not a valid email format'),
	restaurant_address: z.string().min(3, {
		message: 'Restaurant Address must contain at least 3 character(s)',
	}),
	owner_name: z
		.string()
		.min(3, {message: 'Owner Name must contain at least 3 character(s)'}),
	owner_phone: z.string().min(7).max(13),
	subscription_uuid: z.object({value: z.string(), label: z.string()}),
	start_date: z.number(),
});
