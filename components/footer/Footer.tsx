'use client'

import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Logo & Deskripsi */}
          <div>
            <img src="/images/Logo.png" alt="Logo Pondok" className="w-36 mb-4" />
            <p className="text-sm text-white/80 leading-relaxed text-justify">
            Terwujudnya insan yang memiliki keseimbangan sepiritual, intelektual, dan akhlakul karimah menuju generasi ulul albab yang berkomitmen tinggi terhadap kemaslahatan umat dengan berasaskan dengan akhlusunnah wal jamaah.
            </p>
          </div>

          {/* Link Cepat */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="/" className="hover:text-yellow-400">Beranda</a></li>
              <li><a href="/profil/sejarah" className="hover:text-yellow-400">Profil</a></li>
              <li><a href="/unit-pendidikan" className="hover:text-yellow-400">Unit Pendidikan</a></li>
              <li><a href="/informasi" className="hover:text-yellow-400">Informasi</a></li>
              <li><a href="/psb" className="hover:text-yellow-400">Pendaftaran</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2"><MapPin size={18} /> <span>Jl. Pesantren No. 123, Kota Santri</span></li>
              <li className="flex items-start gap-2"><Phone size={18} /> <span>(021) 12345678</span></li>
              <li className="flex items-start gap-2"><Mail size={18} /> <span>info@pondok.id</span></li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Ikuti Kami</h3>
            <p className="text-sm text-white/80 mb-4">Dapatkan update kegiatan dan informasi terbaru:</p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-yellow-400 transition-transform hover:scale-110"><Facebook size={22} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-yellow-400 transition-transform hover:scale-110"><Instagram size={22} /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} YASRIFA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

