'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Swal from 'sweetalert2'

interface Pendaftar {
  id: string
  nama: string
  tempatLahir: string
  tanggalLahir: string
  jenisKelamin: string
  agama: string
  asalSekolah: string
  nisn: string
  noUjian: string
  nik: string
  alamat: string
  desa: string
  kecamatan: string
  kabupaten: string
  provinsi: string
  tinggalDengan: string
  ayahNama: string
  ayahLahir: string
  ayahPendidikan: string
  ayahPekerjaan: string
  ayahPenghasilan: string
  ibuNama: string
  ibuLahir: string
  ibuPendidikan: string
  ibuPekerjaan: string
  ibuPenghasilan: string
  telp: string
  email: string
  saudara: number
  tinggi: number
  berat: number
  hobi: string
  pendidikanTujuan: string
  foto?: string
  createdAt: string
}

export default function PsbPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [data, setData] = useState<Pendaftar[]>([])

  useEffect(() => {
    if (session?.user.role !== 'admin') {
      router.push('/admin')
    }
  }, [session])

  const fetchData = async () => {
    const res = await fetch('/api/pendaftar')
    const json = await res.json()
    setData(json.data || [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleExportPDF = () => {
    const doc = new jsPDF()
    doc.text('Data Pendaftar', 14, 16)
    autoTable(doc, {
      head: [['No', 'Nama', 'Lahir', 'Jenis Kelamin', 'Asal Sekolah', 'Alamat', 'Telp']],
      body: data.map((d, i) => [
        i + 1,
        d.nama,
        `${d.tempatLahir}, ${new Date(d.tanggalLahir).toLocaleDateString()}`,
        d.jenisKelamin,
        d.asalSekolah,
        `${d.alamat}, ${d.desa}, ${d.kecamatan}`,
        d.telp
      ]),
      startY: 20
    })
    doc.save('data-pendaftar.pdf')
  }

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data ini akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    })

    if (result.isConfirmed) {
      const res = await fetch(`/api/pendaftar/${id}`, { method: 'DELETE' })
      if (res.ok) {
        await fetchData()
        Swal.fire('Berhasil!', 'Data telah dihapus.', 'success')
      } else {
        Swal.fire('Gagal!', 'Tidak dapat menghapus data.', 'error')
      }
    }
  }

  const handleDeleteAll = async () => {
    const result = await Swal.fire({
      title: 'Hapus semua data?',
      text: 'Seluruh data pendaftar akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus semua!',
      cancelButtonText: 'Batal',
    })

    if (result.isConfirmed) {
      const res = await fetch('/api/pendaftar', { method: 'DELETE' })
      if (res.ok) {
        await fetchData()
        Swal.fire('Berhasil!', 'Semua data dihapus.', 'success')
      } else {
        Swal.fire('Gagal!', 'Tidak dapat menghapus semua data.', 'error')
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-green-700">Kelola PSB</h1>
        <div className="flex gap-2">
          <button onClick={handleDeleteAll} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded">
            Hapus Semua
          </button>
          <button onClick={handleExportPDF} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
            Export PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full border text-sm">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-2 py-1 border">No</th>
              <th className="px-2 py-1 border">Nama</th>
              <th className="px-2 py-1 border">Tempat Lahir</th>
              <th className="px-2 py-1 border">Tanggal Lahir</th>
              <th className="px-2 py-1 border">Alamat</th>
              <th className="px-2 py-1 border">Asal Sekolah</th>
              <th className="px-2 py-1 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(data.length, 10) }).map((_, i) => {
              const row = data[i]
              return (
                <tr key={i} className="even:bg-green-50 text-center">
                  <td className="px-2 py-1 border">{i + 1}</td>
                  <td className="px-2 py-1 border">{row?.nama || '-'}</td>
                  <td className="px-2 py-1 border">{row?.tempatLahir || '-'}</td>
                  <td className="px-2 py-1 border">{row?.tanggalLahir ? new Date(row.tanggalLahir).toLocaleDateString() : '-'}</td>
                  <td className="px-2 py-1 border">{row?.alamat || '-'}</td>
                  <td className="px-2 py-1 border">{row?.asalSekolah || '-'}</td>
                  <td className="px-2 py-1 border">
                    {row && (
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
