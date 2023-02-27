import React from 'react'

interface HRLineProps {
  text: string
}

const HRLine = ({ text }: HRLineProps) => (
  <div className="inline-flex w-full items-center justify-center">
    <hr className="my-8 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700" />
    <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-l-semibold text-gray-900 dark:bg-gray-900 dark:text-white">
      {text}
    </span>
  </div>
)

export default HRLine
