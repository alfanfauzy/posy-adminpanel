import {z} from 'zod';

export const categorySchema = z.object({
	category_name: z.string().min(3),
	is_active: z.boolean(),
});
