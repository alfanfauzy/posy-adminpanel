import { BaseMetadata, Metadata } from 'shared/baseResponse'

/** CREATE ROLE */

export interface CreateRoleMetadataResponse {
  created_at: BaseMetadata
}

export interface CreateRoleResponse {
  uuid: string
  metadata: CreateRoleMetadataResponse
}

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
