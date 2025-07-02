'use client'

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Props { slug: string }
interface Slide { id: string; title: string; image: string }

export default function UnitSlider({ slug }: Props) {
  const [slides, setSlides] = useState<Slide[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: { perView: 1 },
    created: () => startAutoplay(),
  })

  // Fetch slider data
  useEffect(() => {
    fetch(`/api/unit-slider/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSlides(data)
        else if (Array.isArray(data.data)) setSlides(data.data)
        else setSlides([])
      })
  }, [slug])

  // Autoplay
  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      instanceRef.current?.next()
    }, 4000)
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  if (!slides.length) return null

  return (
    <div ref={sliderRef} className="keen-slider mt-8 rounded-lg overflow-hidden">
      {slides.map((slide, index) => (
        <div key={slide.id} className="keen-slider__slide relative h-[250px] md:h-[400px]">
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 text-sm rounded">
            {slide.title}
          </div>
        </div>
      ))}
    </div>
  )
}
