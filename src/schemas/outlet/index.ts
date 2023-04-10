import {z} from 'zod';

export const ManageOutletFormSchema = z.object({
	restaurant_uuid: z.object({value: z.string(), label: z.string()}),
	province_id: z.object({value: z.string(), label: z.string()}),
	city_id: z.object({value: z.string(), label: z.string()}),
	district_id: z.object({value: z.string(), label: z.string()}),
	subdistrict_id: z.object({value: z.string(), label: z.string()}),
	outlet_name: z.string().min(3),
	outlet_code: z.string().optional(),
	address: z.string().min(3),
	phone: z.string().min(10),
	latitude: z.string().optional(),
	longitude: z.string().optional(),
	qty_table: z.string().nonempty(),
	email: z.string().email('This is not a valid email format'),
});
