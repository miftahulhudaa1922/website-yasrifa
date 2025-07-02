import UnitSejarahForm from "../components/UnitSejarahForm"

interface SejarahPageProps {
  params: {
    slug: string
  }
}

export default function SejarahPage({ params }: SejarahPageProps) {
  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <UnitSejarahForm slug={params.slug} />
    </div>
  )
}
