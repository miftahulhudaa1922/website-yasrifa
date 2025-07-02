"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

interface Slide {
  id: string;
  title: string;
  image: string;
}

export default function UnitSliderAdmin({ slug }: { slug: string }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, [slug]);

  const fetchSlides = async () => {
    try {
      const res = await fetch(`/api/unit-slider/${slug}`);
      const data = await res.json();
      setSlides(Array.isArray(data) ? data : data.data ?? []);
    } catch (err) {
      console.error(err);
      showAlert("Gagal menyimpan slide", "error");
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);

      if (!res.ok) {
        console.error("❌ Upload Cloudinary gagal:", data);
        throw new Error(data?.error || "Upload ke Cloudinary gagal");
      }

      return data.secure_url;
    } catch (err) {
      console.error(err, text);
      throw new Error("Respon upload tidak valid");
    }
  };

  const showAlert = (message: string, type: "success" | "error") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleSubmit = async () => {
    if (!title || (!image && !editingId)) {
      showAlert("Judul dan gambar wajib diisi", "error");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      const payload = new FormData();
      payload.append("title", title);
      if (imageUrl) payload.append("image", imageUrl);

      const url = editingId
        ? `/api/unit-slider/${slug}/${editingId}`
        : `/api/unit-slider/${slug}`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: payload });

      if (!res.ok) throw new Error("Gagal simpan slide");

      resetForm();
      await fetchSlides();
      showAlert(
        editingId ? "Slide diperbarui" : "Slide ditambahkan",
        "success"
      );
    } catch (err) {
      console.error(err);
      showAlert("Gagal menyimpan slide", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (slide: Slide) => {
    setTitle(slide.title);
    setEditingId(slide.id);
    setImage(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus slide ini?")) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/unit-slider/${slug}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await fetchSlides();
      showAlert("Slide berhasil dihapus", "success");
    } catch {
      showAlert("Gagal menghapus slide", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setImage(null);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-green-700">
        Kelola Slider: {slug}
      </h2>

      <div className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul slide"
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white inline-flex items-center"
          >
            {loading && (
              <Loader2 className="animate-droplet-spin mr-2 h-5 w-5 text-white" />
            )}
            {editingId ? "Simpan Perubahan" : "Tambah Slide"}
          </Button>

          {editingId && (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Batal
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {slides.map((s) => (
          <div key={s.id} className="border rounded overflow-hidden shadow-sm">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-32 object-cover"
            />
            <div className="text-center text-sm p-2 font-medium">{s.title}</div>
            <div className="flex justify-center gap-2 pb-2">
              <button
                onClick={() => handleEdit(s)}
                className="text-blue-600 text-xs hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="text-red-600 text-xs hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
