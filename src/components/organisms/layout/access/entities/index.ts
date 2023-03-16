import { GetAccessListDataResponse } from '@/data/access/types'

export interface AccessByGroup {
  group: string
  access: GetAccessListDataResponse[]
}
