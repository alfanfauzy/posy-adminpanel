import { z } from 'zod'

export const RestaurantFormSchema = z.object({
  restaurant_code: z.string().min(3),
  restaurant_name: z.string().min(3),
  restaurant_description: z.string().min(3),
  restaurant_logo:
    typeof window === 'undefined' ? z.string() : z.instanceof(FileList),
  nib: typeof window === 'undefined' ? z.string() : z.instanceof(FileList),
  npwp: typeof window === 'undefined' ? z.string() : z.instanceof(FileList),
  restaurant_phone: z.string().min(10).max(14),
  restaurant_email: z.string().email('Please Input valid email'),
  restaurant_address: z.string().min(3),
  owner_name: z.string().min(3),
  owner_phone: z.string().min(10).max(14),
  subscription_uuid: z.object({ value: z.string(), label: z.string() }),
  start_date: z.string().min(3, { message: 'Field Start Date is required' }),
})

export const EditRestaurantFormSchema = z.object({
  restaurant_code: z.string().min(3),
  restaurant_name: z.string().min(3),
  restaurant_description: z.string().min(3),
  restaurant_logo:
    typeof window === 'undefined' ? z.string() : z.instanceof(FileList),
  nib: typeof window === 'undefined' ? z.string() : z.instanceof(FileList),
  npwp: typeof window === 'undefined' ? z.string() : z.instanceof(FileList),
  restaurant_phone: z.string().min(10).max(14),
  restaurant_email: z.string().email('Please Input valid email'),
  restaurant_address: z.string().min(3),
  owner_name: z.string().min(3),
  owner_phone: z.string().min(10).max(14),
  subscription_uuid: z.object({ value: z.string(), label: z.string() }),
  start_date: z.number(),
})
