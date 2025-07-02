'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa'
import UnitSejarahForm from './components/UnitSejarahForm'
import UnitVisiMisiForm from './components/UnitVisiMisiForm'
import UnitSliderAdmin from './components/UnitSliderForm'
import UnitGaleriAdmin from './components/UnitGaleriForm'

export default function UnitContentTabs() {
  const [tab, setTab] = useState<'sejarah' | 'visi-misi' | 'slider' | 'galeri'>('sejarah')
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  return (
    <div className="p-6">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-green-700 hover:underline mb-4"
      >
        <FaArrowLeft className="text-sm" />
        <span>Kembali</span>
      </button>

      <h1 className="text-2xl font-bold mb-4 capitalize text-green-700">
        Kelola Konten: {slug.replace('-', ' ')}
      </h1>

      {/* Tab Navigation */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {(['sejarah', 'visi-misi', 'slider', 'galeri'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded ${
              tab === key ? 'bg-green-700 text-white' : 'bg-gray-200'
            }`}
          >
            {key === 'visi-misi' ? 'Visi Misi' : key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'sejarah' && <UnitSejarahForm slug={slug} />}
      {tab === 'visi-misi' && <UnitVisiMisiForm slug={slug} />}
      {tab === 'slider' && <UnitSliderAdmin slug={slug} />}
      {tab === 'galeri' && <UnitGaleriAdmin slug={slug} />}
    </div>
  )
}
