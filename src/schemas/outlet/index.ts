import { z } from 'zod'

export const ManageOutletFormSchema = z.object({
  restaurant: z.object({ value: z.string(), label: z.string() }),
  outlet: z.string().min(3),
  city: z.string().min(3),
  address: z.string().min(3),
  phone: z.string().min(3),
})
