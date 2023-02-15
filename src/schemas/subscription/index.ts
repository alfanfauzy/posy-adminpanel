import { z } from 'zod'

export const SubscriptionFormSchema = z.object({
  subscriptionName: z.string().min(3),
  subscriptionPeriod: z.object({ label: z.string(), value: z.string() }),
  subscriptionPrice: z.number(),
})
