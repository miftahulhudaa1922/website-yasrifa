"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  slug: string;
}
interface GaleriItem {
  id: string;
  image: string;
  caption: string;
}

export default function UnitGaleri({ slug }: Props) {
  const [items, setItems] = useState<GaleriItem[] | null>(null);

  useEffect(() => {
    fetch(`/api/unit-galeri/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.galeriList)) {
          setItems(data.galeriList);
        } else {
          console.error("⚠️ Data galeriList tidak valid:", data);
          setItems([]);
        }
      })
      .catch((err) => {
        console.error("❌ Gagal fetch galeri:", err);
        setItems([]);
      });
  }, [slug]);

  if (items === null) return <p>Loading galeri...</p>;
  if (!items.length) return <p>Tidak ada galeri.</p>;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-green-800">Galeri Kegiatan</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative h-48 rounded overflow-hidden shadow"
          >
            <Image
              src={item.image}
              alt={item.caption || "Gambar galeri"}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
