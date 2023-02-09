import { z } from 'zod'

export const RoleFormSchema = z.object({
  role: z.string().min(3),
  description: z.string().min(3),
})
