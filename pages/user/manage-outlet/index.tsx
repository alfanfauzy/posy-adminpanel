import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import useAuthentication from '@/hooks/useAuthentication'
import ManageOutletLayout from '@/pages/user/manageOutlet'

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
        <ManageOutletLayout />
      </GeneralLayout>
    </>
  )
}

export default ManageOutletPage
