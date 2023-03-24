export interface OutletBased {
  uuid: string
  restaurant_uuid: string
  restaurant_name: string
  outlet_name: string
  city: string
  address: string
  phone: string
}

export type Outlet = OutletBased

export type Outlets = OutletBased[]

export interface FormOutlet {
  postal_code_id: number
  restaurant_uuid: string
  outlet_name: string
  outlet_code: string
  subdistrict_id: number
  address: string
  latitude: string
  longitude: string
  phone: string
  email: string
  status: string
}
