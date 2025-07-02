'use client'

import { useEffect, useState } from 'react'

interface GaleriItem {
  id: string
  image: string
  caption: string
}

export default function GaleriSection() {
  const [galeri, setGaleri] = useState<GaleriItem[]>([])

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const res = await fetch('/api/all-galeri')
        const data = await res.json()
        setGaleri(data?.galeri ?? [])
      } catch (error) {
        console.error('❌ Gagal memuat galeri:', error)
      }
    }

    fetchGaleri()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Galeri Kegiatan</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galeri.map((item, index) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.caption || `Galeri ${index + 1}`}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
