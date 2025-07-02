'use client'

import Link from 'next/link'

const units = [
  { slug: 'madrasah-diniyah', label: 'Kelola Madrasah Diniyah' },
  { slug: 'paud', label: 'Kelola PAUD' },
  { slug: 'mitq', label: 'Kelola MITQ' },
  { slug: 'smp', label: 'Kelola SMPI' },
  { slug: 'ma', label: 'Kelola MA' },
  { slug: 'smk', label: 'Kelola SMK' },
]

export default function UnitPendidikanListPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Kelola Unit Pendidikan</h1>
      <ul className="space-y-3">
        {units.map((unit) => (
          <li key={unit.slug}>
            <Link
              href={`/admin/unit-pendidikan/${unit.slug}`}
              className="block px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
            >
              {unit.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
