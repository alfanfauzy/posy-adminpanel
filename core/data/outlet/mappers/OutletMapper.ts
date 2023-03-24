import { GetOutletListDataResponse } from '../type'
import { Outlets } from '@/domain/outlet/models'

export const mapToOutletModel = (datas: GetOutletListDataResponse[]): Outlets =>
  datas.map((data) => ({
    uuid: data.uuid,
    address: data.address,
    city: data.city,
    outlet_name: data.outlet_name,
    phone: data.phone,
    restaurant_name: data.restaurant_name,
    seconds: data.created_at.seconds,
    restaurant_uuid: data.restaurant_uuid,
  }))
