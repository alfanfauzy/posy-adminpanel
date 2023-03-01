export interface LoginTimeResponse {
  seconds: number
  nanos: number
}

export interface AccessResponse {
  uuid: string
  name: string
  key: string
  description: string
}

export interface RoleResponse {
  uuid: string
  name: string
  is_internal: boolean
}

export interface RoleAccessResponse {
  role: RoleResponse
  access: AccessResponse[]
}

export interface LoginDataResponse {
  uuid: string
  token: string
  refresh_token: string
  expired_at: LoginTimeResponse
  role_access: RoleAccessResponse
}
