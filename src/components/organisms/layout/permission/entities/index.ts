export interface DataType {
  uuid?: string
  name?: string
  description?: string
  key?: string
  created_at?: {
    seconds?: number
    nanos?: number
  }
}
