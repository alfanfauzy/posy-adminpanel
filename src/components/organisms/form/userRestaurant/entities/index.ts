export interface FormUserRestaurantEntities {
  name?: string
  email?: string
  phone?: string
  role?: { label: string; value: string }
  outlet?: { label: string; value: string }
  password?: string
  confirm_password?: string
}
