import { z } from 'zod'

export const RestaurantFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(3),
  phone: z.string().min(3),
  address: z.string().min(3),
  nib: z.string(),
  npwp: z.string(),
  owner_name: z.string().min(3),
  owner_phone: z.string().min(3),
})
