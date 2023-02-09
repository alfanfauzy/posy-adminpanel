import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import RolePermissionGeneral from '@/pages/role'

const RolePermissionPage = () => (
  <>
    <MoleculesMetaHeader
      title="Role Permission - Admin Panel FnB"
      description="Role Permission - Admin Panel FnB"
    />
    <GeneralLayout>
      <RolePermissionGeneral />
    </GeneralLayout>
  </>
)

export default RolePermissionPage
