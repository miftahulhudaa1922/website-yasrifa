'use client'

import { useEffect, useState } from 'react'
import ProfileNav from '@/components/ProfileNav'

export default function Sambutan() {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/profil')
        const result = await res.json()
        setContent(result.sambutan ?? null)
      } catch (err) {
        console.error('Gagal memuat data sambutan', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="container mx-auto p-4">
      <ProfileNav />
      <h2 className="text-xl font-bold mb-2">Sambutan</h2>

      {loading ? (
        <p>Memuat...</p>
      ) : content ? (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        />
      ) : (
        <p>Data sambutan tidak tersedia.</p>
      )}
    </main>
  )
}
