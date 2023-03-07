/** GET ROLE */
import { Metadata } from 'core/data/types/BaseMetadata'

export interface GetRoleListDataResponse {
  uuid: string
  name: string
  description: string
  is_internal: boolean
  metadata: Metadata
}
