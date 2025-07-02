'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

interface Props {
  form: any
  setForm: (val: any) => void
  next: () => void
}

// Skema validasi untuk step 1
const step1Schema = z.object({
  namaLengkap: z.string().min(1, 'Nama wajib diisi'),
  tempatLahir: z.string().min(1, 'Tempat lahir wajib diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  jenisKelamin: z.string().min(1, 'Pilih jenis kelamin'),
  agama: z.string().min(1, 'Agama wajib diisi'),
  asalSekolah: z.string().min(1, 'Asal sekolah wajib diisi'),
  nisn: z
    .string()
    .regex(/^\d{10}$/, 'NISN harus 10 digit angka'),
  noUjian: z
    .string()
    .regex(/^\d+$/, 'No ujian harus berupa angka'),
  nik: z
    .string()
    .regex(/^\d{16}$/, 'NIK harus 16 digit angka'),
})

export default function Step1Siswa({ form, setForm, next }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    const result = step1Schema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
      setIsValid(false)
    } else {
      setErrors({})
      setIsValid(true)
    }
  }, [form])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Data Calon Siswa Baru</h2>
      <div className="flex flex-col gap-4">
        {[
          { name: 'namaLengkap', placeholder: 'Nama Lengkap' },
          { name: 'tempatLahir', placeholder: 'Tempat Lahir' },
        ].map(({ name, placeholder }) => (
          <div key={name}>
            <input
              name={name}
              value={form[name] || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder={placeholder}
            />
            {errors[name] && (
              <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <input
            type="date"
            name="tanggalLahir"
            value={form.tanggalLahir || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {errors.tanggalLahir && (
            <p className="text-sm text-red-600 mt-1">{errors.tanggalLahir}</p>
          )}
        </div>

        <div>
          <select
            name="jenisKelamin"
            value={form.jenisKelamin || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Jenis Kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          {errors.jenisKelamin && (
            <p className="text-sm text-red-600 mt-1">{errors.jenisKelamin}</p>
          )}
        </div>

        <div>
          <select
            name="agama"
            value={form.agama || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Agama</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Budha">Budha</option>
          </select>
          {errors.agama && (
            <p className="text-sm text-red-600 mt-1">{errors.agama}</p>
          )}
        </div>

        {[
          { name: 'asalSekolah', placeholder: 'Nama Asal Sekolah' },
          { name: 'nisn', placeholder: 'NISN' },
          { name: 'noUjian', placeholder: 'No. Ujian Sekolah' },
          { name: 'nik', placeholder: 'NIK' },
        ].map(({ name, placeholder }) => (
          <div key={name}>
            <input
              name={name}
              value={form[name] || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder={placeholder}
            />
            {errors[name] && (
              <p className="text-sm text-red-600 mt-1">{errors[name]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={next}
          disabled={!isValid}
          className={`px-4 py-2 rounded text-white ${
            isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
