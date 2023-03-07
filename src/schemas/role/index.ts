import { z } from 'zod'

export const RoleFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  // is_internal: z.boolean(),
})
