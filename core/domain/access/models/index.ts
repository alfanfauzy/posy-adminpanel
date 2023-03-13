export interface AccessBased {
  uuid: string
  name: string
  key: string
  description: string
  seconds: number
}

export type Access = AccessBased

export type Accesss = AccessBased[]

export type FormAccess = {
  name: string
  key: string
  description: string
}
