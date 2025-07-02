'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils' // Optional: helper className joiner jika punya

const menuItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/slider', label: 'Kelola Slider' },
  { href: '/admin/profil', label: 'Kelola Profil' },
  { href: '/admin/unit-pendidikan', label: 'Kelola Unit Pendidikan' },
  { href: '/admin/informasi', label: 'Kelola Informasi' },
  { href: '/admin/galeri', label: 'Kelola Galeri' },
  { href: '/admin/kontak', label: 'Kelola Kontak' },
  { href: '/admin/psb', label: 'Kelola PSB' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-green-900 text-white min-h-screen shadow-lg flex flex-col">
      <div className="px-6 py-4 border-b border-green-700">
        <h2 className="text-2xl font-semibold tracking-wide">Admin Panel</h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-4 py-2 rounded-md transition duration-200 hover:bg-green-700',
              pathname === item.href ? 'bg-green-700 font-semibold' : 'text-white/80'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
