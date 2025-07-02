"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Slide {
  id: string;
  title: string;
  image: string;
}

export default function ImageSlider() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
    created() {
      startAutoplay();
    },
  });

  // Fetch slides from backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/slider");
        const data = await res.json();
        if (Array.isArray(data.data)) {
          setSlides(data.data);
        }
      } catch (err) {
        console.error("Failed to load slider data:", err);
      }
    };
    fetchSlides();
  }, []);

  // Autoplay setup
  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
  };

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    const handler = (s: any) => setCurrentSlide(s.track.details.rel);
    slider.on("slideChanged", handler);
  }, []);

  if (slides.length === 0) {
    return (
      <div className="h-[300px] md:h-[500px] bg-gray-100 animate-pulse rounded-lg" />
    );
  }

  return (
    <div className="relative mt-14">
      <div ref={sliderRef} className="keen-slider rounded-lg overflow-hidden">
        {slides.map((slide, idx) => (
          <div className="keen-slider__slide" key={slide.id}>
            <div className="relative w-full h-[300px] md:h-[500px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
                {slide.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bullet Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === idx ? "bg-yellow-500" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
