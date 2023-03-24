import { z } from 'zod'

export const ManageOutletFormSchema = z.object({
  postal_code_id: z.string().min(5),
  restaurant_uuid: z.object({ value: z.string(), label: z.string() }),
  province_id: z.object({ value: z.string(), label: z.string() }),
  city_id: z.object({ value: z.string(), label: z.string() }).nullable(),
  district_id: z.object({ value: z.string(), label: z.string() }).nullable(),
  subdistrict_id: z.object({ value: z.string(), label: z.string() }).nullable(),
  outlet_name: z.string().min(3),
  outlet_code: z.string().min(3),
  address: z.string().min(3),
  phone: z.string().min(10),
  latitude: z.string().min(5),
  longitude: z.string().min(5),
  table: z.string(),
  email: z.string().email('Please Input valid email'),
  status: z.string(),
})
