'use client'

import { useEffect, useState } from 'react'
import ProfileNav from "@/components/ProfileNav"

export default function VisiMisi() {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/profil')
        const result = await res.json()
        setContent(result.visiMisi ?? null)
      } catch (error) {
        console.error('Gagal memuat visi misi:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <main className="container mx-auto p-4">
      <ProfileNav />
      <h2 className="text-xl font-bold mb-4 text-center">Visi, Misi dan Tujuan</h2>
      {loading ? (
        <p>Memuat konten...</p>
      ) : content ? (
        <div
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
        />
      ) : (
        <p>Konten belum tersedia.</p>
      )}
    </main>
  )
}
