export interface AdminBased {
  uuid: string
  fullname: string
  name: string
  role: string
  seconds: number
}

export type Admin = AdminBased

export type Admins = AdminBased[]
