import React, { useMemo, useState } from 'react'
import { Button } from 'posy-fnb-core'
import { toast } from 'react-toastify'
import { AccessByGroup } from './entities'
import { useGetRolesViewModal } from '@/view/role/view-modals/GetRolesViewModel'
import { GetRolesInput } from '@/domain/role/repositories/RoleRepository'
import { useGetAccessViewModal } from '@/view/access/view-modals/GetAccessViewModel'
import { Loading } from '@/atoms/loading'
import { Role } from 'core/domain/role/models/index'
import { useCreateRoleAccessViewModal } from '@/view/roleaccess/view-modals/CreateRoleAccessViewModel'
import { GetAccessListDataResponse } from '@/data/access/types'
import VerticalTabs from '@/atoms/verticalTabs'
import { TempAccess } from '@/domain/access/models'

const GroupingAccess = (DataAccesses: object): AccessByGroup[] => {
  const mapAccessPermission: AccessByGroup[] = []

  Object.assign(DataAccesses).forEach((access: GetAccessListDataResponse) => {
    /**
     * Split string key to get first string before :
     * etc: access, product, role
     */
    const groupKey = access.key.split(':')[0]

    /**
     * Filter data access where the key is same like group key
     */
    const getAccessByKey = Object.assign(DataAccesses).filter(
      (data: GetAccessListDataResponse) => {
        const keyAccess = data.key.split(':')[0]

        return keyAccess === groupKey
      },
    )

    const isDataNotExist =
      mapAccessPermission.filter((e) => e.group === groupKey).length === 0

    /** Check If data not exist then push object to array */
    if (isDataNotExist) {
      mapAccessPermission.push({ group: groupKey, access: getAccessByKey })
    }
  })

  return mapAccessPermission
}

const AccessSettingLayout = () => {
  const [selectedRole, setSelectedRole] = useState({ id: '0', name: '' })
  const [tempAccess, setTempAccess] = useState<TempAccess[]>([])

  const hooksParams: GetRolesInput = {
    search: [{ field: 'is_internal', value: 'true' }],
    sort: { field: 'created_at', value: 'desc' },
    page: 1,
    limit: 0,
  }

  const {
    data: DataRoles,
    isLoading: isLoadingRole,
    refetch: refetchDataRole,
  } = useGetRolesViewModal(hooksParams)

  const {
    data: DataAccesses,
    isLoading: isLoadingAccess,
    refetch: refetchDataAccess,
  } = useGetAccessViewModal(hooksParams)

  const { createRoleAccess, isLoading } = useCreateRoleAccessViewModal({
    onSuccess() {
      toast.success('Success save setting')
      refetchDataAccess()
      refetchDataRole()
    },
  })

  /**
   * Return to new Array newDataRole
   * [
   *  {
   *    accesses : []
        id : "a66290fd-e21f-45ba-8dae-f7aa030e8b6b"
        name : "Customer Support"
   *  }
   * ]
   */
  const newDataRole = useMemo(() => {
    if (!DataRoles) return []

    return Object.assign(DataRoles).map((role: Role) => ({
      id: role.uuid,
      name: role.name,
      accesses: role.accesses,
    }))
  }, [DataRoles])

  /**
   * Return to new Array and Grouping by key
   * [
   *  {
   *    access : []
   *    group : "report"
   *  }
   * ]
   */
  const newDataAccess = useMemo(() => {
    if (!DataAccesses) return []

    return GroupingAccess(DataAccesses)
  }, [DataAccesses])

  const handleSubmit = () => {
    const { id: role_uuid } = selectedRole

    const access_uuids = tempAccess.map((access) => access.uuid)

    const payload = {
      role_uuid,
      access_uuids,
    }

    createRoleAccess(payload)
  }

  return (
    <main className="mt-4">
      {isLoadingRole && isLoadingAccess ? (
        <section className="mx-[50%]">
          <Loading size={50} />
        </section>
      ) : (
        <VerticalTabs
          dataRoles={newDataRole}
          dataAccesses={newDataAccess}
          tempAccess={tempAccess}
          setSelectedRole={setSelectedRole}
          setTempAccess={setTempAccess}
        />
      )}
      <section className="text-right">
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          isLoading={isLoading}
        >
          Save Setting
        </Button>
      </section>
    </main>
  )
}

export default AccessSettingLayout
