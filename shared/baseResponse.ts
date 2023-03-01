export interface Response<TData = unknown> {
  code: number
  data: TData
  message: string
  more_info: string
}

export interface DataList<T> {
  objs: Array<T>
}
