'use client'

import { GraduationCap, Users, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function StatistikSection() {
  return (
    <section className="bg-green-900 rounded-xl text-white py-12 px-6 md:px-20 shadow-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[{
          icon: <GraduationCap size={40} className="text-yellow-400 mb-2" />,
          value: "850+",
          label: "Siswa Aktif",
        }, {
          icon: <Users size={40} className="text-yellow-400 mb-2" />,
          value: "120+",
          label: "Guru & Staff",
        }, {
          icon: <BookOpen size={40} className="text-yellow-400 mb-2" />,
          value: "3.200+",
          label: "Alumni",
        }, {
          icon: <Award size={40} className="text-yellow-400 mb-2" />,
          value: "75+",
          label: "Prestasi",
        }].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="flex flex-col items-center"
          >
            {item.icon}
            <p className="text-4xl font-bold text-yellow-400">{item.value}</p>
            <p className="mt-2 text-lg">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}