import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import useAuthentication from '@/hooks/useAuthentication'
import RoleUserLayout from '@/pages/user/role'

const RoleUserPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Role User - Admin Panel FnB"
        description="Role User - Admin Panel FnB"
      />
      <GeneralLayout menu="User" subMenu="Role User">
        <RoleUserLayout />
      </GeneralLayout>
    </>
  )
}

export default RoleUserPage
