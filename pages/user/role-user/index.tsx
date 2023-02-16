import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import RoleUserPages from '@/pages/user/role'
import useAuthentication from '@/hooks/useAuthentication'

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
        <RoleUserPages />
      </GeneralLayout>
    </>
  )
}

export default RoleUserPage
