import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import RolePermissionLayout from '@/pages/admin/role'
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
        <RolePermissionLayout />
      </GeneralLayout>
    </>
  )
}

export default RolePermissionPage
