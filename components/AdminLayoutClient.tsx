'use client'

import { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'

export default function AdminLayoutClient({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminSidebar />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </>
  )
}
