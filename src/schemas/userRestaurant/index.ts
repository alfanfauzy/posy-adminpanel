import {z} from 'zod';

export const UserRestauranFormSchema = z
	.object({
		fullname: z
			.string()
			.min(3, {message: 'Name must contain at least 3 character(s)'}),
		email: z.string().email('This is not a valid email format'),
		phone: z.string().min(10).max(13),
		role_uuid: z.object({value: z.string(), label: z.string()}),
		restaurant_uuid: z.object({value: z.string(), label: z.string()}),
		outlet_uuid: z.object({value: z.string(), label: z.string()}),
		password: z
			.string()
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
				'Password must be at least 8 Characters, 1 Uppercase and 1 Lowercase',
			),
		confirmPassword: z
			.string()
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
				'Password must be at least 8 Characters, 1 Uppercase and 1 Lowercase',
			),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
