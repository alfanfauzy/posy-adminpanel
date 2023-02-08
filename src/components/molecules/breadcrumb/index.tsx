import React from 'react'
import { AiFillHome } from 'react-icons/ai'

const MoleculesBreadcrumb = () => (
  <nav
    className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white mb-3"
    aria-label="Breadcrumb"
  >
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      <li className="inline-flex items-center">
        <a
          href="#"
          className="inline-flex items-center text-sm font-medium text-gray-700 gap-1"
        >
          <AiFillHome />
          Dashboard
        </a>
      </li>
    </ol>
  </nav>
)

export default MoleculesBreadcrumb
