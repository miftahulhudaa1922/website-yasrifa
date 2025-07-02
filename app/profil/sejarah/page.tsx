'use client'

import { useEffect, useState } from 'react'
import ProfileNav from "@/components/ProfileNav"

export default function Sejarah() {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/profil')
        const result = await res.json()
        setContent(result.sejarah ?? null)
      } catch (err) {
        console.error('Gagal memuat konten sejarah', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="container mx-auto p-4">
      <ProfileNav />
      <h2 className="text-xl font-bold mb-4">Sejarah Singkat</h2>

      {loading ? (
        <p>Memuat...</p>
      ) : content ? (
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        />
      ) : (
        <p>Data sejarah belum tersedia.</p>
      )}
    </main>
  )
}
