import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import TemplatesHeader from '@/templates/header'
import OrganismSidebar from '@/templates/sidebar'
import AtomDefaultCard from '@/atoms/card'
import MoleculesBreadcrumb from '@/molecules/breadcrumb'
import { useAppSelector } from 'store/hooks'

export interface GeneralLayoutProps {
  children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => (
  //   const auth = useAppSelector((state) => state.auth)

  //   console.log(auth)

  <ProSidebarProvider>
    <main className="bg-gray-300 bg-opacity-40 w-full flex min-h-screen">
      <OrganismSidebar />

      <section className="flex flex-col w-full">
        <TemplatesHeader />

        <div className="bg-slate-100 p-7 border-2 rounded-tl-lg">
          <MoleculesBreadcrumb />

          <AtomDefaultCard className="w-full">{children}</AtomDefaultCard>
        </div>
      </section>
    </main>
  </ProSidebarProvider>
)

export default GeneralLayout
