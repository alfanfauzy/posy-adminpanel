import {z} from 'zod';

export const AdminFormSchema = z
	.object({
		email: z.string().email('This is not a valid email format'),
		fullname: z
			.string()
			.min(3, {message: 'Full Name must contain at least 3 character(s)'}),
		role_uuid: z.object({value: z.string(), label: z.string()}).required(),
		password: z
			.string()
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
				'Password must contain at least one uppercase letter and one lowercase letter',
			)
			.min(8, 'Must be at least 8 characters in length'),
		confirmPassword: z
			.string()
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
				'Password must contain at least one uppercase letter and one lowercase letter',
			)
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
