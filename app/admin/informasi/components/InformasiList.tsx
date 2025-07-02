"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Informasi {
  id: string;
  title: string;
  content: string;
  image: string;
}

export default function InformasiList() {
  const [data, setData] = useState<Informasi[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dotText, setDotText] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/informasi");
    const json = await res.json();
    setData(json.data ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Yakin hapus?",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
    });
    if (!confirm.isConfirmed) return;

    const res = await fetch(`/api/informasi/by-id/${id}`, { method: "DELETE" });
    if (res.ok) {
      await fetchData();
      Swal.fire("Berhasil dihapus", "", "success");
    } else {
      Swal.fire("Gagal menghapus", "", "error");
    }
  };

  const handleEdit = (item: Informasi) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditImage(null);
  };

  const handleUpdate = async () => {
    if (!editTitle || !editContent) {
      Swal.fire("Judul dan Konten wajib diisi", "", "warning");
      return;
    }

    setIsUpdating(true);

    if (editImage && editImage.size > 10 * 1024 * 1024) {
      Swal.fire("Ukuran gambar maksimal 10MB", "", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("content", editContent);
    if (editImage) {
      formData.append("image", editImage);
    }

    const res = await fetch(`/api/informasi/by-id/${editingId}`, {
      method: "PUT",
      body: formData,
    });

    setIsUpdating(false);

    if (res.ok) {
      await fetchData();
      Swal.fire("Informasi berhasil diupdate", "", "success");
      setEditingId(null);
    } else {
      Swal.fire("Gagal mengupdate", "", "error");
    }
  };

  // Animasi titik berjalan saat update
  useEffect(() => {
    if (!isUpdating) {
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
  }, [isUpdating]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Daftar Informasi</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="border p-3 rounded shadow-sm bg-white space-y-2"
          >
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Judul"
                  className="w-full border p-2 rounded"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Konten"
                  className="w-full border p-2 rounded"
                  rows={3}
                />
                <input
                  type="file"
                  onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    disabled={isUpdating}
                  >
                    {isUpdating ? `Updating${dotText}` : "Update"}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-600 hover:underline"
                    disabled={isUpdating}
                  >
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="font-bold">{item.title}</div>
                <div className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {item.content}
                </div>
                {item.image && (
                  <img
                    src={item.image}
                    className="w-full max-w-sm rounded"
                    alt={item.title}
                  />
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
