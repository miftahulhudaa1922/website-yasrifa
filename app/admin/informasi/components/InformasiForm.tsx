"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function InformasiForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dotText, setDotText] = useState("");

  useEffect(() => {
    if (!loading) {
      setDotText("");
      return;
    }

    let step = 0;
    const interval = setInterval(() => {
      const dots = ".".repeat((step % 3) + 1);
      setDotText(dots);
      step++;
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async () => {
    if (!title || !content || !image) {
      Swal.fire({
        icon: "error",
        text: "Judul, konten, dan gambar wajib diisi",
      });
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("content", content);
    form.append("image", image);

    setLoading(true);
    try {
      const res = await fetch("/api/informasi", {
        method: "POST",
        body: form,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      Swal.fire({ icon: "success", text: "Informasi berhasil disimpan" });
      setTitle("");
      setContent("");
      setImage(null);
      onSuccess?.();
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Gagal simpan informasi";
      Swal.fire({ icon: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        placeholder="Judul informasi"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
        placeholder="Isi informasi"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition"
      >
        {loading ? `Menyimpan${dotText}` : "Simpan Informasi"}
      </button>
    </div>
  );
}
