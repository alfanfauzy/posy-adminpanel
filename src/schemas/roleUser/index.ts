import {z} from 'zod';

export const RoleUserFormSchema = z.object({
	role: z.string().min(3),
	description: z.string().min(3),
});
