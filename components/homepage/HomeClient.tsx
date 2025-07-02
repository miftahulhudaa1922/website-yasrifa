'use client'

import ImageSlider from '@/components/ImageSlider'
import GaleriSection from '@/components/homepage/GaleriSection'
import ProgramUnggulan from '@/components/homepage/ProgramUnggulan'
import SejarahSection from '@/components/homepage/SejarahSection'
import StatistikSection from '@/components/homepage/StatistikSection'
import TestimoniSection from '@/components/homepage/TestimoniSection'

export default function HomeClient() {
  return (
    <main className="px-4 md:px-16 space-y-24">
      <ImageSlider />
      <SejarahSection />
      <StatistikSection />
      <ProgramUnggulan />
      <TestimoniSection />
      <GaleriSection />
    </main>
  )
}
