import { GetAdminListDataResponse } from '../types'
import { Admins } from '@/domain/admin/models'

export const mapToAdminModel = (datas: GetAdminListDataResponse[]): Admins =>
  datas.map((data) => ({
    uuid: data.uuid,
    fullname: data.fullname,
    name: data.email,
    role: data.role.name,
    seconds: data.metadata.created_at.seconds,
  }))
