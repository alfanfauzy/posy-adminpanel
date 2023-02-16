import { z } from 'zod'

export const UserSubscriptionFormSchema = z.object({
  restaurantName: z.string().min(3),
  subscriptionPlan: z.object({ label: z.string(), value: z.string() }),
  startDate: z.number(),
})
