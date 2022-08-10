import React from 'react'

export default function View({ children }: { children: React.ReactNode }) {
  return (
    <div className="justify-center">
      <div className="p-3 mx-auto max-w-7xl">{children}</div>
    </div>
  )
}
