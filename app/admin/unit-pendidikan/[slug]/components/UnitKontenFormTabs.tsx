'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function UnitKontenFormTabs() {
  const { slug } = useParams() as { slug: string }

  const [data, setData] = useState({
    sejarah: '',
    visi: '',
    misi: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/unit-konten/${slug}`)
        const json = await res.json()
        if (res.ok) {
          setData({
            sejarah: json.sejarah || '',
            visi: json.visi || '',
            misi: json.misi || '',
          })
        } else {
          toast.error('Gagal memuat data konten')
        }
      } catch {
        toast.error('Terjadi kesalahan saat mengambil data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/unit-konten/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()
      toast.success('Konten berhasil diperbarui')
    } catch {
      toast.error('Gagal menyimpan konten')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-green-700">
        Kelola Konten Unit: {slug.replace(/-/g, ' ').toUpperCase()}
      </h1>

      {loading ? (
        <p className="text-gray-500 text-sm">Memuat data...</p>
      ) : (
        <>
          <Tabs defaultValue="sejarah" className="w-full">
            <TabsList className="mb-4 bg-green-100">
              <TabsTrigger value="sejarah">Sejarah</TabsTrigger>
              <TabsTrigger value="visi">Visi</TabsTrigger>
              <TabsTrigger value="misi">Misi</TabsTrigger>
            </TabsList>

            <TabsContent value="sejarah">
              <label className="block mb-1 text-sm font-medium text-gray-700">Sejarah</label>
              <Textarea
                rows={8}
                value={data.sejarah}
                onChange={(e) => setData((d) => ({ ...d, sejarah: e.target.value }))}
                placeholder="Tuliskan sejarah unit..."
                className="w-full border rounded p-3 text-sm"
              />
            </TabsContent>

            <TabsContent value="visi">
              <label className="block mb-1 text-sm font-medium text-gray-700">Visi</label>
              <Textarea
                rows={6}
                value={data.visi}
                onChange={(e) => setData((d) => ({ ...d, visi: e.target.value }))}
                placeholder="Tuliskan visi unit..."
                className="w-full border rounded p-3 text-sm"
              />
            </TabsContent>

            <TabsContent value="misi">
              <label className="block mb-1 text-sm font-medium text-gray-700">Misi</label>
              <Textarea
                rows={6}
                value={data.misi}
                onChange={(e) => setData((d) => ({ ...d, misi: e.target.value }))}
                placeholder="Tuliskan misi unit..."
                className="w-full border rounded p-3 text-sm"
              />
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              {saving ? 'Menyimpan...' : 'Simpan Semua'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
