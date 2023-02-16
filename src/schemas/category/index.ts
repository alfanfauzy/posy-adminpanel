import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(3),
  isDisplay: z.boolean(),
})

export type ValidationLoginSchema = z.infer<typeof categorySchema>
