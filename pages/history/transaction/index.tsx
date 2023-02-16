import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import useAuthentication from '@/hooks/useAuthentication'
import HistoryTransactionLayout from '@/pages/history/transaction'

const TransactionPage = () => {
  // Handle Authentication
  useAuthentication()

  return (
    <>
      <MoleculesMetaHeader
        title="Transaaction History - Admin Panel Fnb"
        description="Dashboard - Admin Panel Fnb"
      />
      <GeneralLayout menu="Transaction" subMenu="History">
        <HistoryTransactionLayout />
      </GeneralLayout>
    </>
  )
}

export default TransactionPage
