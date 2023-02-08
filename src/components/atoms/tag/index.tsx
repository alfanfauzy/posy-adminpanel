import React from 'react'

const AtomTag = ({ status = 'status' }: string) => (
  <span className="p-1 border border-blue-300 bg-blue-400 text-white rounded-md min-w-fit ">
    {status}
  </span>
)

export default AtomTag
