import { AccessByGroup } from '@/organisms/layout/access/entities'
import { AccessBased, TempAccess } from '@/domain/access/models'

export interface RoleType {
  id: string
  name: string
  accesses: AccessBased[]
}

export interface VerticalTabsProps {
  dataRoles: RoleType[]
  dataAccesses: AccessByGroup[]
  setSelectedRole: React.Dispatch<
    React.SetStateAction<{
      id: string
      name: string
    }>
  >
  tempAccess: TempAccess[]
  setTempAccess: React.Dispatch<React.SetStateAction<TempAccess[]>>
}

export interface AccessFormProps {
  permissionList: AccessByGroup
  tempAccess: TempAccess[]
  setTempAccess: React.Dispatch<React.SetStateAction<TempAccess[]>>
}
