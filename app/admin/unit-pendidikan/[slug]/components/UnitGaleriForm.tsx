"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

interface GaleriItem {
  id: string;
  image: string;
  caption: string;
}

export default function UnitGaleriAdmin({ slug }: { slug: string }) {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");

  useEffect(() => {
    fetchGaleri();
  }, [slug]);

  const fetchGaleri = async () => {
    try {
      const res = await fetch(`/api/unit-galeri/${slug}`);
      const data = await res.json();
      setGaleri(data);
    } catch (error) {
      console.error("Gagal memuat galeri:", error);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log("Cloudinary upload response:", data);

    if (!res.ok || data.error) {
      console.error("Cloudinary upload error:", data);
      throw new Error(data.error?.message || "Upload ke Cloudinary gagal");
    }

    return data.secure_url;
  };

  const handleUpload = async () => {
    if (!image) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Pilih gambar terlebih dahulu",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    setLoading(true);
    try {
      // 1. upload ke cloudinary via api/upload
      const imageUrl = await uploadToCloudinary(image);

      const res = await fetch(`/api/unit-galeri/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageUrl,
          caption,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan galeri");

      setImage(null);
      setCaption("");
      fetchGaleri();

      Swal.fire({
        toast: true,
        icon: "success",
        title: "Gambar berhasil diunggah",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Upload gagal",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus gambar ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/unit-galeri/${slug}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus");

      fetchGaleri();

      Swal.fire({
        toast: true,
        icon: "success",
        title: "Gambar berhasil dihapus",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Gagal menghapus gambar",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      console.error(err);
    }
  };

  const handleEdit = async (id: string) => {
    const form = new FormData();
    form.append("caption", editCaption);

    try {
      const res = await fetch(`/api/unit-galeri/${slug}/${id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Gagal update");

      setEditingId(null);
      fetchGaleri();

      Swal.fire({
        toast: true,
        icon: "success",
        title: "Caption berhasil diupdate",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Gagal menyimpan perubahan",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-green-700">
        Kelola Galeri: {slug}
      </h2>

      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Caption (opsional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          {loading ? "Mengunggah..." : "Upload"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galeri.map((item) => (
          <div
            key={item.id}
            className="border rounded overflow-hidden relative group shadow-sm"
          >
            <img
              src={item.image}
              alt={item.caption || "galeri"}
              className="w-full h-32 object-cover"
            />
            <div className="p-2 text-sm text-center">
              {editingId === item.id ? (
                <>
                  <input
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                  />
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-xs text-white bg-blue-600 px-2 py-1 rounded"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs text-gray-600 underline"
                    >
                      Batal
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700">{item.caption || "—"}</p>
                  <div className="flex justify-center gap-2 mt-1 text-sm">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditCaption(item.caption);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
