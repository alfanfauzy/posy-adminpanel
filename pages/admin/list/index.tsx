import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import AdminListLayout from '@/pages/admin/list'
import useAuthentication from '@/hooks/useAuthentication'

const ListAdminPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="List Admin - Admin Panel FnB"
        description="List Admin - Admin Panel FnB"
      />
      <GeneralLayout menu="Admin" subMenu="List Admin">
        <AdminListLayout />
      </GeneralLayout>
    </>
  )
}

export default ListAdminPage
