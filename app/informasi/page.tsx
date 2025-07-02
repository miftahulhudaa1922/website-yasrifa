import Link from 'next/link'

interface InfoItem {
  id: string
  title: string
  slug: string
  image: string
  excerpt: string
  createdAt: string
}

export default async function InformasiPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/informasi`, { cache: 'no-store' })
  const data = await res.json()
  const list: InfoItem[] = data.data || []

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Informasi Terbaru</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {list.map((info) => (
          <Link key={info.id} href={`/informasi/${info.slug}`} className="border rounded shadow hover:shadow-lg transition">
            <img src={info.image} alt={info.title} className="w-full h-48 object-cover rounded-t" />
            <div className="p-4">
              <h2 className="font-semibold text-lg text-green-800">{info.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{info.excerpt}</p>
              <p className="text-xs text-right text-gray-500 mt-2">{new Date(info.createdAt).toLocaleDateString('id-ID')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
