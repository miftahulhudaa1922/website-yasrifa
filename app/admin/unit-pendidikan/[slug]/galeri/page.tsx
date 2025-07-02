'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface GaleriItem {
  id: string
  image: string
  caption: string
}

export default function UnitGaleriAdmin() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : ''

  const [caption, setCaption] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [galeri, setGaleri] = useState<GaleriItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (slug) {
      fetchGaleri()
    }
  }, [slug])

  const fetchGaleri = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/unit-galeri/${slug}`)
      const result = await res.json()
      setGaleri(result?.data ?? [])
    } catch (err) {
      console.error('Gagal memuat galeri:', err)
    } finally {
      setLoading(false)
    }
  }

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_defaultt') // ganti dengan preset Cloudinary kamu
    formData.append('folder', 'unit-galeri')

    const res = await fetch('https://api.cloudinary.com/v1_1/dtbv31w2o/image/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Upload ke Cloudinary gagal')
    const data = await res.json()
    return data.secure_url as string
  }

  const handleSubmit = async () => {
    if (!image) return alert('Gambar wajib diunggah')

    try {
      const imageUrl = await uploadToCloudinary(image)

      const form = new FormData()
      form.append('caption', caption)
      form.append('image', imageUrl)

      const res = await fetch(`/api/unit-galeri/${slug}`, {
        method: 'POST',
        body: form,
      })

      if (!res.ok) throw new Error('Gagal simpan ke database')

      setCaption('')
      setImage(null)
      await fetchGaleri()
    } catch (err) {
      console.error('Gagal menyimpan:', err)
      alert('Gagal menyimpan gambar')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-green-700 capitalize">
        Galeri Unit: {slug.replace('-', ' ')}
      </h1>

      <div className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Keterangan foto (opsional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Upload Gambar
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Memuat galeri...</p>
      ) : galeri.length === 0 ? (
        <p className="text-gray-500">Belum ada gambar.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galeri.map((item) => (
            <div key={item.id} className="bg-white rounded shadow overflow-hidden">
              <img
                src={item.image}
                alt={item.caption || 'Foto'}
                className="w-full h-32 object-cover"
              />
              {item.caption && (
                <p className="text-sm text-center p-2 text-gray-700">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
