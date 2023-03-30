import {z} from 'zod';

export const ProductSchema = z.object({
	restaurant_uuid: z.string(),
	product_name: z.string().min(3),
	product_description: z.string().min(3),
	product_image_url: z.string(),
	is_favourite: z.boolean(),
	is_show: z.boolean(),
	is_available: z.boolean(),
	discount: z.string(),
	price: z.string().nonempty(),
	price_after_discount: z.string(),
	cooking_duration: z.string().nonempty(),
	restaurant_outlet_uuids: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.array(),
	category_uuids: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.array(),
	addons: z
		.object({
			addon_name: z.string().nonempty(),
			is_optional: z.boolean(),
			can_choose_multiple: z.boolean(),
			max_variant: z.string(),
			addon_priority: z.string(),
			variants: z
				.object({
					variant_name: z.string().nonempty(),
					variant_price: z.string().nonempty(),
					variant_priority: z.number(),
				})
				.array(),
		})
		.array(),
});
