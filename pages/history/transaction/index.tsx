import React from 'react'
import MoleculesMetaHeader from '@/molecules/meta-header'
import GeneralLayout from '@/templates/layouts'
import HistoryTransactionPage from '@/pages/history/transaction'

const TransactionPage = () => (
  <>
    <MoleculesMetaHeader
      title="Transaaction History - Admin Panel Fnb"
      description="Dashboard - Admin Panel Fnb"
    />
    <GeneralLayout menu="Transaction" subMenu="History">
      <HistoryTransactionPage />
    </GeneralLayout>
  </>
)

export default TransactionPage
