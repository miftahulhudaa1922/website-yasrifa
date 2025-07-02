// app/unit-pendidikan/[slug]/page.tsx
import { use } from 'react' // ✅ WAJIB untuk unwrapping async params
import UnitSlider from '@/components/unit/UnitSlider'
import UnitSejarah from '@/components/unit/UnitSejarah'
import UnitVisiMisi from '@/components/unit/UnitVisiMisi'
import UnitGaleri from '@/components/unit/UnitGaleri'

interface Props {
  params: Promise<{ slug: string }> // ✅ Harus promise
}

export default function UnitPendidikanPage(props: Props) {
  const { slug } = use(props.params) // ✅ Unwrap params dengan React.use()

  return (
    <main className="px-4 md:px-16 space-y-20 py-10">
      <UnitSlider slug={slug} />
      <UnitSejarah slug={slug} />
      <UnitVisiMisi slug={slug} />
      <UnitGaleri slug={slug} />
    </main>
  )
}
