import { BaseMetadata, Metadata } from 'shared/baseResponse'

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
