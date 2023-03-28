import { GetAdminListDataResponse } from '../types'
import { Admins } from '@/domain/admin/models'

export const mapToAdminModel = (datas: GetAdminListDataResponse[]): Admins =>
  datas.map((data) => ({
    uuid: data.uuid,
    fullname: data.fullname,
    email: data.email,
    roleid: data.role.uuid,
    rolename: data.role.name,
    seconds: data.metadata.created_at.seconds,
    is_admin: data.is_admin,
  }))
