import { GetOutletListDataResponse } from '../type'
import { Outlets } from '@/domain/outlet/models'

export const mapToOutletModel = (datas: GetOutletListDataResponse[]): Outlets =>
  datas.map((data) => ({
    uuid: data.uuid,
    address: data.address,
    outlet_name: data.outlet_name,
    outlet_code: data.outlet_code,
    phone: data.phone,
    latitude: data.latitude,
    longitude: data.longitude,
    restaurant_name: data.restaurant_name,
    seconds: data.metadata.created_at.seconds,
    restaurant_uuid: data.restaurant_uuid,
    email: data.email,
    table: data.table,
    city_id: data.city_id,
    city_name: data.city_name,
    provincy_id: data.province_id,
    provincy_name: data.province_name,
    district_id: data.district_id,
    district_name: data.district_name,
    subdistrict_id: data.subdistrict_id,
    subdistrict_name: data.subdistrict_name,
  }))
