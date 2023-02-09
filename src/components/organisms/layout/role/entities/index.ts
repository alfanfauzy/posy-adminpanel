export interface DataType {
  uuid: string
  name: string
  description: string
  is_admin: boolean
  created_at: {
    seconds: number
    nanos: number
  }
  accesses: [
    {
      uuid: string
      name: string
      key: string
      created_at: {
        seconds: number
        nanos: number
      }
      created_by: string
    },
  ]
}
