import React from 'react'
import { ProSidebarProvider } from 'react-pro-sidebar'
import TemplatesHeader from '@/templates/header'
import OrganismSidebar from '@/templates/sidebar'
import AtomDefaultCard from '@/atoms/card'

export interface GeneralLayoutProps {
  children: React.ReactNode
  titleHeader?: string
}

const GeneralLayout = (props: GeneralLayoutProps) => {
  const { children, titleHeader } = props

  return (
    <ProSidebarProvider>
      <main className="bg-gray-300 bg-opacity-40 w-full flex h-screen">
        <OrganismSidebar />

        <section className="flex flex-col w-full">
          <TemplatesHeader />

          <div className="bg-slate-100 h-screen p-7 border-2 rounded-tl-lg">
            <h1 className="mb-2 text-lg font-medium">{titleHeader}</h1>

            <AtomDefaultCard className="drop-shadow-lg w-full">
              {children}
            </AtomDefaultCard>
          </div>
        </section>
      </main>
    </ProSidebarProvider>
  )
}

export default GeneralLayout
