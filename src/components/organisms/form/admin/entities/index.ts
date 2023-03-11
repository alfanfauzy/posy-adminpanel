export interface FormAdminEntities {
  fullname: string
  email: string
  password: string
  role_uuid: { value: string; label: string }
}

export type FormEditAdminEntities = Pick<FormAdminEntities, 'fullname'> & {
  role_uuid: string
}
