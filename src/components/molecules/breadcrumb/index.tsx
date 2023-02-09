import React from 'react'
import { AiFillHome } from 'react-icons/ai'

const MoleculesBreadcrumb = () => (
  <nav
    className="mb-3 flex rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-700"
    aria-label="Breadcrumb"
  >
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      <li className="inline-flex items-center">
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-700"
        >
          <AiFillHome />
          Dashboard
        </a>
      </li>
    </ol>
  </nav>
)

export default MoleculesBreadcrumb
