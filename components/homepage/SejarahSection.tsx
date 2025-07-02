'use client'
import Image from "next/image";
import Link from "next/link";

export default function SejarahSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">Sejarah Singkat</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
        Pondok Pesantren Riyadlatul Falahin adalah lembaga pendidikan Islam swasta (non-pemerintah). Dirintis sejak 2007, didirikan pada tanggal 27 Desember 2007 oleh KH. Sholahuddin Al Ghozali, SH.I.,MH dan dua pamannya Saman Hudi dan Marsono, dengan sistem kurikulum yang terpadu, pendidikan berasrama serta pengajaran bahasa Arab secara intensif.
        </p>
        <Link
          href="/profil/sejarah"
          className="inline-block bg-green-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          Selengkapnya
        </Link>
      </div>
      <div className="flex justify-center">
        <Image
          src="/images/pendiri.png"
          alt="Foto Pendiri"
          width={400}
          height={500}
          className="rounded-lg shadow-lg object-cover h-[400px] w-auto"
        />
      </div>
    </section>
  );
}