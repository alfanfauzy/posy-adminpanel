import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import RolePermissionGeneral from '@/pages/admin/role'
import useAuthentication from '@/hooks/useAuthentication'

const RolePermissionPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Role Permission - Admin Panel FnB"
        description="Role Permission - Admin Panel FnB"
      />
      <GeneralLayout menu="Admin" subMenu="Role & Permission">
        <RolePermissionGeneral />
      </GeneralLayout>
    </>
  )
}

export default RolePermissionPage
