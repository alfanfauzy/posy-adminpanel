import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import TemplatesHeader from '@/templates/header'
import OrganismSidebar from '@/templates/sidebar'
import AtomDefaultCard from '@/atoms/card'
import MoleculesBreadcrumb from '@/molecules/breadcrumb'

export interface GeneralLayoutProps {
  children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => (
  <ProSidebarProvider>
    <main className="w-full flex min-h-screen bg-gray-300 bg-opacity-40">
      <OrganismSidebar />

      <section className="w-full flex flex-col">
        <TemplatesHeader />

        <div className="rounded-tl-lg border-2 bg-slate-100 p-7">
          <MoleculesBreadcrumb />

          <AtomDefaultCard className="w-full">{children}</AtomDefaultCard>
        </div>
      </section>
    </main>
  </ProSidebarProvider>
)

export default GeneralLayout
