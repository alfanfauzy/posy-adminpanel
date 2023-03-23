export type FileBase = {
  name: string
  size: number
  type: string
  lastModified: number
  lastModifiedDate?: Date
}

export interface FormRestaurantEntities {
  restaurant_name: string
  restaurant_description: string
  restaurant_logo: FileList | string
  restaurant_code: string
  restaurant_phone: string
  restaurant_email: string
  restaurant_address: string
  nib: FileList | string
  npwp: FileList | string
  owner_name: string
  owner_phone: string
  subscription_uuid: { value: string; label: string }
  start_date: string | number
}
