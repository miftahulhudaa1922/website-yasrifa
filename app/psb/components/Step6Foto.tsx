'use client'

import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

interface Props {
  form: any
  setForm: (val: any) => void
  prev: () => void
}

export default function Step6Foto({ form, setForm, prev }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkboxError, setCheckboxError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (form.foto) {
      const url = URL.createObjectURL(form.foto)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [form.foto])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isValidType = ['image/jpeg', 'image/png'].includes(file.type)
    const isValidSize = file.size <= 200 * 1024

    if (!isValidType) {
      setError('Format foto harus .jpg atau .png')
      return
    }
    if (!isValidSize) {
      setError('Ukuran maksimal 200KB')
      return
    }

    setError(null)
    setForm({ ...form, foto: file })
  }

  const handleSubmit = async () => {
    if (!form.pendidikanTujuan) {
      setError('Pendidikan yang akan ditempuh wajib dipilih.')
      return
    }

    if (!form.foto) {
      setError('Silakan upload foto terlebih dahulu.')
      return
    }

    if (!confirmed) {
      setCheckboxError('Anda harus menyatakan bahwa data sudah benar.')
      return
    }

    setLoading(true)
    setError(null)
    setCheckboxError(null)

    try {
      const formData = new FormData()
      formData.append('nama', form.namaLengkap)
      formData.append('tempatLahir', form.tempatLahir)
      formData.append('tanggalLahir', form.tanggalLahir)
      formData.append('jenisKelamin', form.jenisKelamin)
      formData.append('agama', form.agama)
      formData.append('asalSekolah', form.asalSekolah)
      formData.append('nisn', form.nisn)
      formData.append('noUjian', form.noUjian)
      formData.append('nik', form.nik)
      formData.append('alamat', form.alamat)
      formData.append('desa', form.desa)
      formData.append('kecamatan', form.kecamatan)
      formData.append('kabupaten', form.kabupaten)
      formData.append('provinsi', form.provinsi)
      formData.append('tinggalDengan', form.tinggalDengan)

      formData.append('ayahNama', form.ayah.nama)
      formData.append('ayahLahir', form.ayah.tahunLahir)
      formData.append('ayahPendidikan', form.ayah.pendidikan)
      formData.append('ayahPekerjaan', form.ayah.pekerjaan)
      formData.append('ayahPenghasilan', form.ayah.penghasilan)
      formData.append('ibuNama', form.ibu.nama)
      formData.append('ibuLahir', form.ibu.tahunLahir)
      formData.append('ibuPendidikan', form.ibu.pendidikan)
      formData.append('ibuPekerjaan', form.ibu.pekerjaan)
      formData.append('ibuPenghasilan', form.ibu.penghasilan)

      formData.append('telp', form.kontak.telp)
      formData.append('email', form.kontak.email)

      formData.append('saudara', form.pribadi.saudara)
      formData.append('tinggi', form.pribadi.tinggi)
      formData.append('berat', form.pribadi.berat)
      formData.append('hobi', form.pribadi.hobi)

      formData.append('pendidikanTujuan', form.pendidikanTujuan)
      formData.append('foto', form.foto)

      const res = await fetch('/api/pendaftar', {
        method: 'POST',
        body: formData,
      })

      const result = await res.json()

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Pendaftaran berhasil!',
          text: 'File akan diunduh otomatis.',
          timer: 3000,
          showConfirmButton: false,
        })

        const link = document.createElement('a')
        link.href = result.pdfUrl
        link.download = result.pdfUrl.split('/').pop() ?? 'pendaftar.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        setError('Gagal mengirim data.')
        console.error(result.errors)
      }
    } catch (err) {
      console.error(err)
      setError('Terjadi kesalahan saat mengirim.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review & Foto Pendaftar</h2>

      {/* Ringkasan Data */}
      <div className="text-sm border border-gray-300 rounded p-4 mb-6 space-y-1 bg-gray-50">
        <h3 className="font-semibold text-gray-700 mb-2">Ringkasan Data:</h3>
        <p><strong>Nama:</strong> {form.namaLengkap}</p>
        <p><strong>Lahir:</strong> {form.tempatLahir}, {form.tanggalLahir}</p>
        <p><strong>Jenis Kelamin:</strong> {form.jenisKelamin}</p>
        <p><strong>Agama:</strong> {form.agama}</p>
        <p><strong>Asal Sekolah:</strong> {form.asalSekolah}</p>
        <p><strong>NISN:</strong> {form.nisn}</p>
        <p><strong>No. Ujian:</strong> {form.noUjian}</p>
        <p><strong>NIK:</strong> {form.nik}</p>
        <p><strong>Alamat:</strong> {form.alamat}, {form.desa}, {form.kecamatan}, {form.kabupaten}, {form.provinsi}</p>
        <p><strong>Tinggal Dengan:</strong> {form.tinggalDengan}</p>
        <p><strong>Ayah:</strong> {form.ayah?.nama} ({form.ayah?.pekerjaan})</p>
        <p><strong>Ibu:</strong> {form.ibu?.nama} ({form.ibu?.pekerjaan})</p>
        <p><strong>Telp:</strong> {form.kontak?.telp}</p>
        <p><strong>Email:</strong> {form.kontak?.email}</p>
        <p><strong>Saudara:</strong> {form.pribadi?.saudara}</p>
        <p><strong>Tinggi:</strong> {form.pribadi?.tinggi} cm</p>
        <p><strong>Berat:</strong> {form.pribadi?.berat} kg</p>
        <p><strong>Hobi:</strong> {form.pribadi?.hobi}</p>
        <p><strong>Pendidikan Tujuan:</strong> {form.pendidikanTujuan}</p>
      </div>

      {/* Pilih Pendidikan */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Pendidikan yang Akan Ditempuh</label>
        <select
          value={form.pendidikanTujuan}
          onChange={(e) => setForm({ ...form, pendidikanTujuan: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">-- Pilih Pendidikan --</option>
          <option value="PAUD">PAUD</option>
          <option value="MI">MI</option>
          <option value="SMP">SMP</option>
          <option value="MA">MA</option>
          <option value="SMK">SMK</option>
          <option value="KULIAH">KULIAH</option>
          <option value="MONDOK SAJA">MONDOK SAJA</option>
        </select>
      </div>

      {/* Upload Foto */}
      <div className="mb-4">
        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFile} />
        <p className="text-sm text-gray-500 mt-2">Maksimal 200 KB. Format jpg/png.</p>
      </div>

      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Preview" className="h-48 rounded border" />
        </div>
      )}

      {/* Checkbox konfirmasi */}
      <div className="mb-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => {
              setConfirmed(e.target.checked)
              if (e.target.checked) setCheckboxError(null)
            }}
          />
          <span>Saya menyatakan bahwa seluruh data di atas sudah benar.</span>
        </label>
        {checkboxError && (
          <p className="text-red-600 text-sm mt-1">{checkboxError}</p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? 'Mengirim...' : 'Submit'}
        </button>
      </div>
    </div>
  )
}
