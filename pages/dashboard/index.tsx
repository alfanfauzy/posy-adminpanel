import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'

const Dashboard = () => (
  <>
    <MoleculesMetaHeader
      title="Dashboard - Admin Panel Fnb"
      description="Dashboard - Admin Panel Fnb"
    />
    <GeneralLayout menu="Dashboard">
      <span className="flex items-center justify-center">Dashboard</span>
    </GeneralLayout>
  </>
)

export default Dashboard
