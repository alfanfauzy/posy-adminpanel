import React, { useMemo, useState } from 'react'
import { Button } from 'posy-fnb-core'
import VerticalTabs from '@/atoms/verticalTabs'
import { useGetRolesViewModal } from '@/view/role/view-modals/GetRolesViewModel'
import { GetRolesInput } from '@/domain/role/repositories/RoleRepository'
import { useGetAccessViewModal } from '@/view/access/view-modals/GetAccessViewModel'
import { Loading } from '@/atoms/loading'
import { Role } from 'core/domain/role/models/index'
import { useCreateRoleAccessViewModal } from '@/view/roleaccess/view-modals/CreateRoleAccessViewModel'

const AccessSettingLayout = () => {
  const [selectedRole, setSelectedRole] = useState({ id: '0', name: '' })
  const hooksParams: GetRolesInput = {
    search: [],
    sort: { field: 'created_at', value: 'desc' },
    page: 1,
    limit: 0,
  }

  const { createRoleAccess, isLoading } = useCreateRoleAccessViewModal({
    onSuccess(data, variables, context) {
      console.log('Success save setting')
    },
  })

  const { data: ListDataRole, isLoading: isLoadingRole } =
    useGetRolesViewModal(hooksParams)

  const { data: ListDataAccess, isLoading: isLoadingAccess } =
    useGetAccessViewModal(hooksParams)

  const dataRole = useMemo(() => {
    if (!ListDataRole) return []
    return Object.assign(ListDataRole).map((role: Role) => ({
      id: role.uuid,
      name: role.name,
    }))
  }, [ListDataRole])

  const handleSubmit = () => {
    const { id: role_uuid } = selectedRole
    const access_uuids: string[] = []
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
        <VerticalTabs tabsList={dataRole} setSelectedRole={setSelectedRole} />
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
