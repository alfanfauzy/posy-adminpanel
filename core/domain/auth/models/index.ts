import { BaseMetadata } from '@/domain/vo/BaseMetadata'

export interface LoginBased {
  uuid: string
  name: string
  is_internal: boolean
  accesses: any
}

export interface Access {
  uuid: string
  name: string
  key: string
  description: string
  is_internal: boolean
}

export interface RoleAccess {
  role: LoginBased
  accesses: Access[]
}

export interface DataLogin {
  uuid: string
  token: string
  refresh_token: string
  expired_at: BaseMetadata
  role_access: RoleAccess
  permission: Array<string>
}

export interface PostLoginPayload {
  email: string
  password: string
}
