import React from 'react'

interface HRLineProps {
  text: string
}

const HRLine = ({ text }: HRLineProps) => (
  <div className="inline-flex w-full items-center justify-center">
    <hr className="dark:bg-gray-40000 my-8 h-px w-full border-0 bg-gray-200" />
    <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-l-semibold text-slate-500 ">
      {text}
    </span>
  </div>
)

export default HRLine
