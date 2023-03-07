export interface RoleBased {
  uuid: string
  name: string
  description: string
  seconds: number
}

export type Role = RoleBased

export type Roles = RoleBased[]
