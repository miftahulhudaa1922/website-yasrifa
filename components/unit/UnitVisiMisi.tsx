'use client'

import { useEffect, useState } from 'react'

interface Props { slug: string }

export default function UnitVisiMisi({ slug }: Props) {
  const [visi, setVisi] = useState('')
  const [misi, setMisi] = useState('')

  useEffect(() => {
    fetch(`/api/unit-visimisi/${slug}`)
      .then(res => res.json())
      .then(data => {
        setVisi(data.visi || '')
        setMisi(data.misi || '')
      })
  }, [slug])

  return (
    <section>
      <h2 className="text-2xl font-bold text-green-800 mb-3">Visi dan Misi</h2>
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Visi</h3>
        <p className="text-gray-700">{visi}</p>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Misi</h3>
        <p className="text-gray-700 whitespace-pre-line">{misi}</p>
      </div>
    </section>
  )
}
