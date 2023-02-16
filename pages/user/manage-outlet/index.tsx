import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import ManageOutletPages from '@/pages/user/manageOutlet'
import useAuthentication from '@/hooks/useAuthentication'

const ManageOutletPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Manage Outlet - Admin Panel FnB"
        description="Manage Outlet - Admin Panel FnB"
      />
      <GeneralLayout menu="User" subMenu="Manage Outlet">
        <ManageOutletPages />
      </GeneralLayout>
    </>
  )
}

export default ManageOutletPage
