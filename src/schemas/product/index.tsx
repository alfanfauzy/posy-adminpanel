import {z} from 'zod';

export const ProductSchema = z.object({
	restaurant_uuid: z.string(),
	product_name: z.string().min(3),
	product_description: z.string().optional(),
	product_image_url: z.string().optional(),
	is_favourite: z.boolean(),
	is_show: z.boolean(),
	is_available: z.boolean(),
	force_outlet_update: z.any(),
	price: z.string().nonempty(),
	price_after_discount: z.string(),
	price_discount_percentage: z.string().optional(),
	cooking_duration: z.string().optional(),
	restaurant_outlet_uuids: z
		.object({
			label: z.string(),
			value: z.string(),
		})
		.array(),
	category_uuids: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		}),
	),
	addons: z
		.object({
			addon_name: z.string().min(3).nonempty(),
			is_optional: z.boolean(),
			can_choose_multiple: z.boolean(),
			max_variant: z.string().optional(),
			addon_priority: z.string().optional(),
			variants: z
				.object({
					variant_name: z.string().nonempty(),
					variant_price: z.string().nonempty(),
					variant_priority: z.number(),
				})
				.array(),
		})
		.array()
		.optional(),
});
