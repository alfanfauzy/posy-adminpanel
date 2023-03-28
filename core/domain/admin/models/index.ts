export interface AdminBased {
  uuid: string
  fullname: string
  email: string
  roleid: string
  rolename: string
  seconds: number
  is_admin: string
}

export type Admin = AdminBased

export type Admins = AdminBased[]

export interface FormAdmin {
  id: string
  params: {
    fullname: string
    email?: string
    password?: string
    role_uuid: string
  }
}
