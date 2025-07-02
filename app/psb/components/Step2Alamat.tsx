'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

interface Props {
  form: any
  setForm: (val: any) => void
  next: () => void
  prev: () => void
}

// Schema validasi khusus Step2
const step2Schema = z.object({
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  desa: z.string().min(1, 'Desa wajib diisi'),
  kecamatan: z.string().min(1, 'Kecamatan wajib diisi'),
  kabupaten: z.string().min(1, 'Kabupaten wajib diisi'),
  provinsi: z.string().min(1, 'Provinsi wajib diisi'),
  tinggalDengan: z.string().min(1, 'Pilih tinggal dengan siapa'),
})

export default function Step2Alamat({ form, setForm, next, prev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    const result = step2Schema.safeParse(form)
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
      <h2 className="text-xl font-semibold mb-4">Keterangan Tempat Tinggal</h2>
      <div className="flex flex-col gap-4">
        {['alamat', 'desa', 'kecamatan', 'kabupaten', 'provinsi'].map((field) => (
          <div key={field}>
            <input
              name={field}
              value={form[field] || ''}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
            {errors[field] && (
              <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        <div>
          <select
            name="tinggalDengan"
            value={form.tinggalDengan || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Tinggal dengan</option>
            <option value="Orang Tua">Orang Tua</option>
            <option value="Wali">Wali</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          {errors.tinggalDengan && (
            <p className="text-sm text-red-600 mt-1">{errors.tinggalDengan}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
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
