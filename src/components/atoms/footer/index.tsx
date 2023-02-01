/**
 * Footer
 */

import React from 'react'

interface FooterProps {
  isFixed?: boolean
}

const Footer = ({ isFixed = false }: FooterProps) => {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer
      className={`mt-4 text-xs text-slate-500 text-center w-full ${
        isFixed && 'absolute bottom-0 mb-3 p-2'
      }`}
    >
      @{year} Pintar Ventura Group
    </footer>
  )
}

export default Footer
