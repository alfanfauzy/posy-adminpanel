export type SortingType = 'desc' | 'asc'

export type Sort<TField = unknown> = {
  field: TField
  value: SortingType
}

export type Search<TField = unknown> = {
  field: TField
  value: string
}

export interface FilterInputVariables<TSort = unknown, TSearch = unknown> {
  sort?: Sort<TSort>
  search?: Search<TSearch>[]
  limit?: number
  page?: number
}

export interface ParamsPayload {
  id?: string
  params: object
}
