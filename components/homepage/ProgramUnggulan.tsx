'use client'

import { Book, Globe, Users2, Mic2 } from "lucide-react";
import { motion } from "framer-motion";

const programs = [
  {
    icon: <Book size={36} className="text-green-700 mb-3 mx-auto" />,
    title: "Tahfidzul Qur'an",
    desc: "Program khusus menghafal Al-Qur'an dengan metode yang terstruktur dan pendampingan intensif."
  },
  {
    icon: <Mic2 size={36} className="text-green-700 mb-3 mx-auto" />,
    title: "Kajian Kitab Kuning",
    desc: "Pendalaman kitab-kitab klasik karya ulama salaf sebagai dasar ilmu keislaman."
  },
  {
    icon: <Globe size={36} className="text-green-700 mb-3 mx-auto" />,
    title: "Bahasa Asing",
    desc: "Pembelajaran Bahasa Arab dan Inggris aktif untuk menunjang wawasan global."
  },
  {
    icon: <Users2 size={36} className="text-green-700 mb-3 mx-auto" />,
    title: "Pembinaan Karakter",
    desc: "Menanamkan nilai adab, kepemimpinan, dan tanggung jawab sejak dini."
  }
];

export default function ProgramUnggulan() {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-900 mb-10">Program Unggulan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {programs.map((program, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-xl cursor-pointer"
          >
            {program.icon}
            <h3 className="text-xl font-semibold text-green-800 mb-2">{program.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{program.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}