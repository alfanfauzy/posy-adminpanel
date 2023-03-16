import { GetRoleListDataResponse } from '../types'
import { Roles } from 'core/domain/role/models'

export const mapToRoleModel = (datas: GetRoleListDataResponse[]): Roles =>
  datas.map((data) => ({
    uuid: data.uuid,
    name: data.name,
    description: data.description,
    is_internal: data.is_internal,
    seconds: data.metadata.created_at.seconds,
    accesses: data.accesses,
  }))
