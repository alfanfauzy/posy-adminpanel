import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import AdminListPage from '@/pages/admin/list'

const ListAdminPage = () => (
  <>
    <MoleculesMetaHeader
      title="List Admin - Admin Panel FnB"
      description="List Admin - Admin Panel FnB"
    />
    <GeneralLayout menu="Admin" subMenu="List Admin">
      <AdminListPage />
    </GeneralLayout>
  </>
)

export default ListAdminPage
