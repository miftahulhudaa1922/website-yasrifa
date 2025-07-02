"use client";

import { useState, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import Swal from "sweetalert2";

export default function KontakPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  const [kontak, setKontak] = useState({
    alamat: "",
    email: "",
    telp: "",
    mapsUrl: "",
  });

  useEffect(() => {
    fetch("/api/kontak")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.message) {
          setKontak({
            alamat: data.alamat || "",
            email: data.email || "",
            telp: data.telp || "",
            mapsUrl: data.mapsUrl || "",
          });
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/pesan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, email, pesan }),
    });

    setLoading(false);

    if (res.ok) {
      Swal.fire({
        title: "Berhasil!",
        text: "Pesan Anda berhasil dikirim.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });

      setNama("");
      setEmail("");
      setPesan("");
    } else {
      Swal.fire({
        title: "Gagal",
        text: "Terjadi kesalahan saat mengirim pesan.",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
      {/* Informasi Kontak */}
      <div>
        <h1 className="text-3xl font-bold text-green-700 mb-4">Hubungi Kami</h1>
        <p className="text-gray-600 mb-6">
          Jika Anda memiliki pertanyaan seputar pendaftaran, kunjungan, atau
          informasi lainnya, jangan ragu untuk menghubungi kami.
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-start">
            <MapPin className="w-6 h-6 text-green-600 mt-1" />
            <p className="ml-3 whitespace-pre-line">{kontak.alamat}</p>
          </div>

          {kontak.telp && (
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-green-600" />
              <p className="ml-3">{kontak.telp}</p>
            </div>
          )}

          {kontak.email && (
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-green-600" />
              <p className="ml-3">{kontak.email}</p>
            </div>
          )}
        </div>

        {/* Google Map */}
        {kontak.mapsUrl && (
          <div className="mt-8">
            <iframe
              src={kontak.mapsUrl}
              width="100%"
              height="250"
              className="rounded shadow"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      {/* Formulir Kontak */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4 border"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Kirim Pesan
        </h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nama
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Pesan
          </label>
          <textarea
            rows={5}
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition relative"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              Mengirim
              <span className="ml-1 animate-pulse font-bold">.</span>
              <span className="ml-[-4px] animate-pulse delay-150 font-bold">
                .
              </span>
              <span className="ml-[-4px] animate-pulse delay-300 font-bold">
                .
              </span>
            </span>
          ) : (
            "Kirim Pesan"
          )}
        </button>
      </form>
    </div>
  );
}
