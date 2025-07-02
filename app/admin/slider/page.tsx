'use client';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface Slide {
  id: string;
  title: string;
  image: string;
}

export default function SliderAdminPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/slider');
      const json = await res.json();

      if (res.ok && Array.isArray(json.data)) {
        setSlides(json.data);
      } else {
        setSlides([]);
        console.warn('Unexpected API response:', json);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      MySwal.fire('Error', 'Gagal mengambil data slider.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || (!image && !editingId)) {
      return MySwal.fire('Oops', 'Judul dan gambar wajib diisi.', 'warning');
    }

    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image);

    try {
      const endpoint = editingId ? `/api/slider/${editingId}` : '/api/slider';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal menyimpan');

      MySwal.fire(
        'Berhasil',
        editingId ? 'Slide diperbarui.' : 'Slide ditambahkan.',
        'success'
      );
      resetForm();
      fetchSlides();
    } catch (error) {
      console.error('Submit error:', error);
      MySwal.fire('Gagal', 'Terjadi kesalahan saat menyimpan data.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = await MySwal.fire({
      title: 'Yakin ingin menghapus?',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      icon: 'warning',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/slider/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Gagal hapus');
      MySwal.fire('Dihapus', 'Slide berhasil dihapus.', 'success');
      fetchSlides();
    } catch (error) {
      console.error('Delete error:', error);
      MySwal.fire('Error', 'Gagal menghapus slide.', 'error');
    }
  };

  const handleEdit = (slide: Slide) => {
    setTitle(slide.title);
    setEditingId(slide.id);
    setImage(null);
  };

  const resetForm = () => {
    setTitle('');
    setImage(null);
    setEditingId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-green-700">Kelola Slider</h1>

      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Judul slide"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="w-full"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Simpan Perubahan' : 'Tambah Slide'}
          </button>
          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Batal Edit
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : slides.length === 0 ? (
        <p className="text-gray-500">Belum ada data slider.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {slides.map((slide) => (
            <div key={slide.id} className="border rounded shadow bg-white">
              <img
                src={slide.image}
                alt={slide.title || 'Gambar slider'}
                className="w-full h-32 object-cover"
                onError={(e) => {
                  // fallback jika gambar gagal dimuat
                  (e.target as HTMLImageElement).src = '/placeholder.jpg';
                }}
              />
              <div className="p-2 text-center text-sm font-medium">
                {slide.title}
              </div>
              <div className="flex justify-center gap-2 pb-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="text-blue-600 hover:underline text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="text-red-600 hover:underline text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
