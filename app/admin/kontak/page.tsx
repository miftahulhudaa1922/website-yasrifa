'use client'

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function AdminKontakPage() {
  const [form, setForm] = useState({
    alamat: '',
    email: '',
    telp: '',
    mapsUrl: '',
  })

  const [loading, setLoading] = useState(false)
  const [dotCount, setDotCount] = useState(0)

  // Ambil data kontak saat pertama kali
  useEffect(() => {
    fetch('/api/kontak')
      .then(res => res.json())
      .then(data => {
        if (data && !data.message) {
          setForm({
            alamat: data.alamat || '',
            email: data.email || '',
            telp: data.telp || '',
            mapsUrl: data.mapsUrl || '',
          })
        }
      })
  }, [])

  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4)
    }, 500)
    return () => clearInterval(interval)
  }, [loading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/kontak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)
    setDotCount(0)

    if (res.ok) {
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data kontak berhasil disimpan',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      })
    } else {
      Swal.fire('Gagal', 'Gagal menyimpan data', 'error')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Kelola Kontak</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            rows={3}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">No. Telepon</label>
          <input
            type="text"
            name="telp"
            value={form.telp}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Google Maps Embed URL</label>
          <input
            type="text"
            name="mapsUrl"
            value={form.mapsUrl}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? `Menyimpan${'.'.repeat(dotCount)}` : 'Simpan'}
        </button>
      </form>
    </div>
  )
}
