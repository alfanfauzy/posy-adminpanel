import { GetRoleListDataResponse } from '../../../role/types'
import { Roles } from 'core/domain/role/models'

export const mapToRoleModel = (datas: GetRoleListDataResponse[]): Roles =>
  datas.map((data) => ({
    uuid: data.uuid,
    name: data.name,
    description: data.description,
    seconds: data.metadata.created_at.seconds,
  }))
