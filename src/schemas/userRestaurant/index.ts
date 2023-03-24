import { z } from 'zod'

export const UserRestauranFormSchema = z
  .object({
    fullname: z.string().min(3),
    email: z.string().email('Please Input valid email'),
    phone: z.string().min(10),
    role_uuid: z.object({ value: z.string(), label: z.string() }),
    restaurant_uuid: z.object({ value: z.string(), label: z.string() }),
    outlet_uuid: z.object({ value: z.string(), label: z.string() }),
    password: z
      .string()
      .max(20)
      .regex(/^(?=.*?[A-Za-z])(?=.*?[#?!@$%^&*-]).{8,}$/i, {
        message:
          'Minimum 8 Characters, 1 Uppercase, 1 Lowercase and unique symbols.',
      }),
    confirmPassword: z
      .string()
      .max(20)
      .regex(/^(?=.*?[A-Za-z])(?=.*?[#?!@$%^&*-]).{8,}$/i, {
        message:
          'Minimum 8 Characters, 1 Uppercase, 1 Lowercase and unique symbols.',
      }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The password did not match',
        path: ['confirmPassword'],
      })
    }
  })
