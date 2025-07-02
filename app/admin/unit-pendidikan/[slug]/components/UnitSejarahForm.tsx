'use client'

import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Props {
  slug: string
}

export default function UnitSejarahForm({ slug }: Props) {
  const [sejarah, setSejarah] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/unit-sejarah/${slug}`)
        const data = await res.json()
        if (data?.sejarah) setSejarah(data.sejarah)
      } catch (err) {
        toast.error('Gagal memuat data sejarah')
      } finally {
        setInitialLoad(false)
      }
    }

    fetchData()
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/unit-sejarah/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sejarah }),
      })

      if (!res.ok) throw new Error()

      toast.success('Sejarah berhasil disimpan')
    } catch {
      toast.error('Gagal menyimpan sejarah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-green-800">
        Sejarah Singkat Unit ({slug})
      </h2>

      {initialLoad ? (
        <p className="text-sm text-gray-500">Memuat data...</p>
      ) : (
        <>
          <Textarea
            rows={10}
            value={sejarah}
            onChange={(e) => setSejarah(e.target.value)}
            placeholder="Tulis sejarah singkat unit pendidikan..."
            className="w-full border rounded p-3 text-sm"
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </>
      )}
    </form>
  )
}
