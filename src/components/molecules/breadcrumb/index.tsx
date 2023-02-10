import React from 'react'
import { AiFillHome, AiOutlineRight } from 'react-icons/ai'

interface MoleculesBreadcrumbProps {
  menu: string
  subMenu?: string
}

const MoleculesBreadcrumb = ({ menu, subMenu }: MoleculesBreadcrumbProps) => (
  <nav
    className="mb-3 flex items-center rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700"
    aria-label="Breadcrumb"
  >
    <ol className="inline-flex w-auto items-center">
      <li className="inline-flex items-center gap-2 text-base font-medium text-gray-700">
        <a href="#" className="inline-flex items-center gap-2 ">
          <AiFillHome />
          {menu}
        </a>
        {subMenu && (
          <span className="flex items-center justify-center gap-1">
            <AiOutlineRight />
            <b>{subMenu}</b>
          </span>
        )}
      </li>
    </ol>
  </nav>
)

export default MoleculesBreadcrumb
