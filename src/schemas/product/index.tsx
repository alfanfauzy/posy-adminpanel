import {z} from 'zod';

export const ProductSchema = z.object({
	category_uuids: z.string().min(3),
});
