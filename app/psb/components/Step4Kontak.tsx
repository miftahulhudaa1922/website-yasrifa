'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

interface Props {
  form: any
  setForm: (val: any) => void
  next: () => void
  prev: () => void
}

// Skema Zod untuk validasi kontak
const step4Schema = z.object({
  kontak: z.object({
    telp: z.string()
      .min(1, 'Nomor telepon wajib diisi')
      .regex(/^\d+$/, 'Nomor telepon harus angka'),
    email: z.string().email('Format email tidak valid'),
  }),
})

export default function Step4Kontak({ form, setForm, next, prev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      kontak: {
        ...form.kontak,
        [e.target.name]: e.target.value,
      },
    })
  }

  useEffect(() => {
    const result = step4Schema.safeParse(form)
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
      <h2 className="text-xl font-semibold mb-4">Kontak</h2>
      <div className="flex flex-col gap-4">
        <div>
          <input
            name="telp"
            value={form.kontak.telp}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Nomor Telepon Rumah"
          />
          {errors['kontak.telp'] && (
            <p className="text-sm text-red-600 mt-1">{errors['kontak.telp']}</p>
          )}
        </div>
        <div>
          <input
            name="email"
            type="email"
            value={form.kontak.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Email"
          />
          {errors['kontak.email'] && (
            <p className="text-sm text-red-600 mt-1">{errors['kontak.email']}</p>
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
