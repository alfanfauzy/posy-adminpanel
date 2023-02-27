export interface DataType {
  uuid?: string
  username?: string
  fullname?: string
  created_at?: {
    seconds?: number
    nanos?: number
  }
  updated_at?: {
    seconds?: number
    nanos?: number
  }
  deleted_at?: {
    seconds?: number
  }
  last_login?: {
    seconds?: number
  }
  role?: [
    {
      uuid?: string
      name?: string
      is_admin?: boolean
    },
  ]
}
