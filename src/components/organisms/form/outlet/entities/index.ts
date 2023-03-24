export interface ObjectSelect {
  value: string
  label: string
}

export interface FormManageOutletEntities {
  postal_code_id: string
  restaurant_uuid: { label: string; value: string }
  outlet_name: string
  outlet_code: string
  province_id: { label: string; value: string } | null
  city_id: { label: string; value: string } | null
  district_id: { label: string; value: string } | null
  subdistrict_id: { label: string; value: string } | null
  latitude: string
  longitude: string
  address: string
  phone: string
  email: string
  status: string
  table: string
}
