import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import TemplatesHeader from '@/templates/header'
import OrganismSidebar from '@/templates/sidebar'
import AtomDefaultCard from '@/atoms/card'
import MoleculesBreadcrumb from '@/molecules/breadcrumb'

export interface GeneralLayoutProps {
  children: React.ReactNode
  menu: string
  subMenu?: string
}

const GeneralLayout = ({ children, menu, subMenu }: GeneralLayoutProps) => (
  <ProSidebarProvider>
    <main className="flex min-h-screen w-full bg-gray-300 bg-opacity-40">
      <OrganismSidebar />

      <section className="flex w-full flex-col">
        <TemplatesHeader />

        <div className="rounded-tl-lg border-2 bg-slate-100 p-7">
          <MoleculesBreadcrumb menu={menu} subMenu={subMenu} />

          <AtomDefaultCard className="w-full">{children}</AtomDefaultCard>
        </div>
      </section>
    </main>
  </ProSidebarProvider>
)

export default GeneralLayout
