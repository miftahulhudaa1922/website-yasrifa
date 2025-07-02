"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface InfoDetail {
  title: string;
  image: string;
  content: string;
  createdAt: string;
}

export default function DetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [info, setInfo] = useState<InfoDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { slug } = await params; // ✅ FIXED: tunggu resolve Promise
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/informasi/by-slug/${slug}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      setInfo(data);
    };

    fetchData();
  }, [params]);

  if (!info) return <p className="text-center py-10">Memuat...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Tombol Kembali */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-green-700 hover:text-green-900 transition"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Kembali
      </button>

      {/* Konten Informasi */}
      <h1 className="text-3xl font-bold text-green-800 mb-4">{info.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(info.createdAt).toLocaleString("id-ID")}
      </p>
      <img
        src={info.image}
        alt={info.title}
        className="w-full h-auto rounded shadow mb-6"
      />
      <div
        className="prose max-w-none text-justify"
        dangerouslySetInnerHTML={{ __html: info.content }}
      />
    </div>
  );
}
