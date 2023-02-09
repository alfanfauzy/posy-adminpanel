export interface FormAdminEntities {
  fullname: string
  email: string
  password?: string
  confirmPassword?: string
  role_uuid: { value: string | number; label: string | number }
}
