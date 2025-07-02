
interface GaleriItem {
  id: string
  image: string
  caption: string
  unitSlug: string
}

export default async function GaleriPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all-galeri`, {
    cache: 'no-store',
  })

  const data = await res.json()
  const galeri: GaleriItem[] = data?.galeri || []

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Galeri Kegiatan</h1>

      {galeri.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada gambar galeri.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 py-4">
          {galeri.map((item) => (
            <div key={item.id} className="rounded overflow-hidden shadow">
              <img
                src={item.image}
                alt={item.caption || 'Galeri'}
                width={400}
                height={300}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 text-sm text-center text-gray-700">
                {item.caption || '—'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
