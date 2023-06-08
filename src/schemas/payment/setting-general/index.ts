import {z} from 'zod';

export const UpdateStatusPaymentMethodCategoryFormSchema = z.object({
	payment_method_category: z
		.object({
			uuid: z.string(),
			is_show: z.boolean(),
			payment_method: z
				.object({
					uuid: z.string(),
					is_show: z.boolean(),
				})
				.array(),
		})
		.array(),
});
