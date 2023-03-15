import { Metadata } from '@/domain/vo/BaseMetadata'

export interface CreateRoleAccessResponse {
  status: string
  data: {
    success: string
    metadata: Metadata
  }
}
