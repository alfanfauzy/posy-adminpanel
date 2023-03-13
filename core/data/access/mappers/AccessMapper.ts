import { GetAccessListDataResponse } from '../types'
import { Accesss } from '@/domain/access/models'

export const mapToAccessModel = (datas: GetAccessListDataResponse[]): Accesss =>
  datas.map((data) => ({
    uuid: data.uuid,
    name: data.name,
    key: data.key,
    description: data.description,
    seconds: data.metadata.created_at.seconds,
  }))
