'use client'

import { useState, useEffect } from 'react'

export default function UnitSliderAdmin({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const slug = params.slug

  const fetchSlider = async () => {
    try {
      const res = await fetch(`/api/unit-slider/${slug}`)
      const json = await res.json()
      setData(Array.isArray(json) ? json : json.data ?? [])
    } catch (err) {
      console.error('Gagal memuat slider:', err)
    }
  }

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // GANTI sesuai preset Cloudinary kamu
    formData.append('folder', 'unit-slider')

    const res = await fetch('https://api.cloudinary.com/v1_1/dtbv31w2o/image/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Gagal upload ke Cloudinary')

    const data = await res.json()
    return data.secure_url
  }

  const handleSubmit = async () => {
    if (!title || !image) {
      alert('Judul dan gambar wajib diisi')
      return
    }

    try {
      setLoading(true)
      const imageUrl = await uploadToCloudinary(image)

      const formData = new FormData()
      formData.append('title', title)
      formData.append('image', imageUrl)

      const res = await fetch(`/api/unit-slider/${slug}`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Gagal menyimpan ke database')

      setTitle('')
      setImage(null)
      await fetchSlider()
    } catch (err) {
      console.error('Gagal simpan slide:', err)
      alert('Gagal menyimpan slide')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlider()
  }, [slug])

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-xl font-bold text-green-700">Slider: {slug.replace('-', ' ')}</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul"
        className="w-full border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        {loading ? 'Mengunggah...' : 'Upload'}
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {data.map((item) => (
          <div key={item.id} className="border rounded shadow">
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
            <p className="text-sm text-center p-2">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
