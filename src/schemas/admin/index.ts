import {z} from 'zod';

export const AdminFormSchema = z
	.object({
		email: z.string().email('Please Input valid email'),
		fullname: z.string().min(3),
		role_uuid: z.object({value: z.string(), label: z.string()}),
		password: z
			.string()
			.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
			.regex(new RegExp('.*\\d.*'), 'One number')
			.min(8, 'Must be at least 8 characters in length'),
		confirmPassword: z
			.string()
			.regex(new RegExp('.*[A-Z].*'), 'One uppercase character')
			.regex(new RegExp('.*[a-z].*'), 'One lowercase character')
			.regex(new RegExp('.*\\d.*'), 'One number')
			.min(8, 'Must be at least 8 characters in length'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const EditAdminFormSchema = z.object({
	email: z.string().email('Please Input valid email'),
	fullname: z.string().min(3),
	role_uuid: z.object({value: z.string(), label: z.string()}),
	password: z.string(),
	confirmPassword: z.string(),
});
