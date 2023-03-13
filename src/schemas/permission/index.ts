import { z } from 'zod'

export const PermissionFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  key: z.string().min(3),
})
