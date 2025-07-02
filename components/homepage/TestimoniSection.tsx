"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rudiyanto",
    role: "Alumni 2015",
    image: "/images/testi1.jpg",
    quote: "Pondok ini sangat berperan besar dalam membentuk karakter dan keilmuan saya."
  },
  {
    name: "Mahyuddin Alwi",
    role: "Wali Santri",
    image: "/images/testi2.jpg",
    quote: "Anak saya menjadi lebih disiplin dan rajin setelah nyantri di sini."
  },
  {
    name: "Ismail Solehudin",
    role: "Alumni 2016",
    image: "/images/testi3.jpg",
    quote: "Lingkungan yang kondusif dan penuh semangat belajar."
  },
  {
    name: "Siti Sopiyah",
    role: "Wali Santri",
    image: "/images/testi4.jpg",
    quote: "Lingkungan pesantrennya aman dan nyaman untuk anak-anak."
  }
];

export default function TestimoniSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Testimoni Alumni & Wali Santri
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic mb-2">“{item.quote}”</p>
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}