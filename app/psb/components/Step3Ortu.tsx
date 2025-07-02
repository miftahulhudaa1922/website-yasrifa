'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

interface Props {
  form: any
  setForm: (val: any) => void
  next: () => void
  prev: () => void
}

// Zod schema untuk validasi ayah dan ibu
const step3Schema = z.object({
  ayah: z.object({
    nama: z.string().min(1, 'Nama ayah wajib diisi'),
    tahunLahir: z
      .string()
      .regex(/^\d{4}$/, 'Tahun lahir ayah harus 4 digit angka'),
    pendidikan: z.string().min(1, 'Pendidikan ayah wajib diisi'),
    pekerjaan: z.string().min(1, 'Pekerjaan ayah wajib diisi'),
    penghasilan: z.string().min(1, 'Penghasilan ayah wajib diisi'),
  }),
  ibu: z.object({
    nama: z.string().min(1, 'Nama ibu wajib diisi'),
    tahunLahir: z
      .string()
      .regex(/^\d{4}$/, 'Tahun lahir ibu harus 4 digit angka'),
    pendidikan: z.string().min(1, 'Pendidikan ibu wajib diisi'),
    pekerjaan: z.string().min(1, 'Pekerjaan ibu wajib diisi'),
    penghasilan: z.string().min(1, 'Penghasilan ibu wajib diisi'),
  }),
})

export default function Step3Ortu({ form, setForm, next, prev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    const [parent, field] = name.split('.')
    setForm({
      ...form,
      [parent]: {
        ...form[parent],
        [field]: value,
      },
    })
  }

  useEffect(() => {
    const result = step3Schema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const path = err.path.join('.')
        fieldErrors[path] = err.message
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
      <h2 className="text-xl font-semibold mb-4">Data Orang Tua/Wali</h2>
      <div className="flex flex-col gap-4">
        {/* Ayah */}
        <div>
          <input
            name="ayah.nama"
            value={form.ayah.nama}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Nama Ayah"
          />
          {errors['ayah.nama'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ayah.nama']}</p>
          )}
        </div>
        <div>
          <input
            name="ayah.tahunLahir"
            value={form.ayah.tahunLahir}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Tahun Lahir Ayah"
          />
          {errors['ayah.tahunLahir'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ayah.tahunLahir']}</p>
          )}
        </div>
        <div>
          <select
            name="ayah.pendidikan"
            value={form.ayah.pendidikan}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Pendidikan Ayah</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="Diploma">Diploma</option>
            <option value="Sarjana">Sarjana</option>
          </select>
          {errors['ayah.pendidikan'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ayah.pendidikan']}</p>
          )}
        </div>
        <div>
          <input
            name="ayah.pekerjaan"
            value={form.ayah.pekerjaan}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Pekerjaan Ayah"
          />
          {errors['ayah.pekerjaan'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ayah.pekerjaan']}</p>
          )}
        </div>
        <div>
          <input
            name="ayah.penghasilan"
            value={form.ayah.penghasilan}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Penghasilan Ayah"
          />
          {errors['ayah.penghasilan'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ayah.penghasilan']}</p>
          )}
        </div>

        {/* Ibu */}
        <div>
          <input
            name="ibu.nama"
            value={form.ibu.nama}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Nama Ibu"
          />
          {errors['ibu.nama'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ibu.nama']}</p>
          )}
        </div>
        <div>
          <input
            name="ibu.tahunLahir"
            value={form.ibu.tahunLahir}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Tahun Lahir Ibu"
          />
          {errors['ibu.tahunLahir'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ibu.tahunLahir']}</p>
          )}
        </div>
        <div>
          <select
            name="ibu.pendidikan"
            value={form.ibu.pendidikan}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Pendidikan Ibu</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
            <option value="Diploma">Diploma</option>
            <option value="Sarjana">Sarjana</option>
          </select>
          {errors['ibu.pendidikan'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ibu.pendidikan']}</p>
          )}
        </div>
        <div>
          <input
            name="ibu.pekerjaan"
            value={form.ibu.pekerjaan}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Pekerjaan Ibu"
          />
          {errors['ibu.pekerjaan'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ibu.pekerjaan']}</p>
          )}
        </div>
        <div>
          <input
            name="ibu.penghasilan"
            value={form.ibu.penghasilan}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Penghasilan Ibu"
          />
          {errors['ibu.penghasilan'] && (
            <p className="text-sm text-red-600 mt-1">{errors['ibu.penghasilan']}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={prev} className="bg-gray-500 text-white px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={next}
          disabled={!isValid}
          className={`px-4 py-2 rounded text-white ${
            isValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
