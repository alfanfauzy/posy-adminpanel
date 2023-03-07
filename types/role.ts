import { BaseMetadata, Metadata } from 'core/data/types/BaseMetadata'

/** GET ROLE */
export interface AccessListData {
  uuid: string
  name: string
  key: string
}

export interface RoleListData {
  uuid: string
  name: string
  description: string
  is_internal: boolean
  metadata: Metadata
}

/** CREATE ROLE */

export interface RoleMetadataResponse {
  created_at: BaseMetadata
}

export interface RoleResponse {
  uuid: string
  metadata: RoleMetadataResponse
}
