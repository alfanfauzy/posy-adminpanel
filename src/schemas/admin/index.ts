import { z } from 'zod'

export const AdminFormSchema = z
  .object({
    email: z.string().email('Please Input valid email'),
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
    fullname: z.string().min(3),
    role_uuid: z.object({ value: z.string(), label: z.string() }),
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

export const EditAdminFormSchema = z.object({
  email: z.string().email('Please Input valid email'),
  fullname: z.string().min(3),
  role_uuid: z.object({ value: z.string(), label: z.string() }),
  password: z.string(),
  confirmPassword: z.string(),
})
