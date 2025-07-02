'use client'

import InformasiForm from './components/InformasiForm'
import InformasiList from './components/InformasiList'

export default function AdminInformasiPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-green-700">Kelola Informasi</h1>
      <InformasiForm onSuccess={() => {}} />
      <InformasiList />
    </div>
  )
}
