export interface BaseMetadata {
  seconds: number
  nanos: number
}

export interface Metadata {
  created_at: BaseMetadata
  updated_at: BaseMetadata
  deleted_at: BaseMetadata
}
