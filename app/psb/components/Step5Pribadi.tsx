'use client'

import { useEffect, useState } from 'react'
import { z } from 'zod'

interface Props {
  form: any
  setForm: (val: any) => void
  next: () => void
  prev: () => void
}

const step5Schema = z.object({
  pribadi: z.object({
    saudara: z.string()
      .min(1, 'Jumlah saudara wajib diisi')
      .regex(/^\d+$/, 'Harus berupa angka'),
    tinggi: z.string()
      .min(1, 'Tinggi badan wajib diisi')
      .regex(/^\d+$/, 'Harus berupa angka'),
    berat: z.string()
      .min(1, 'Berat badan wajib diisi')
      .regex(/^\d+$/, 'Harus berupa angka'),
    hobi: z.string().min(1, 'Hobi wajib diisi'),
  }),
})

export default function Step5Pribadi({ form, setForm, next, prev }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      pribadi: {
        ...form.pribadi,
        [e.target.name]: e.target.value,
      },
    })
  }

  useEffect(() => {
    const result = step5Schema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach(err => {
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
      <h2 className="text-xl font-semibold mb-4">Data Pribadi</h2>
      <div className="flex flex-col gap-4">
        <div>
          <input
            name="saudara"
            value={form.pribadi.saudara}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Jumlah Saudara"
          />
          {errors['pribadi.saudara'] && (
            <p className="text-sm text-red-600 mt-1">{errors['pribadi.saudara']}</p>
          )}
        </div>
        <div>
          <input
            name="tinggi"
            value={form.pribadi.tinggi}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Tinggi Badan"
          />
          {errors['pribadi.tinggi'] && (
            <p className="text-sm text-red-600 mt-1">{errors['pribadi.tinggi']}</p>
          )}
        </div>
        <div>
          <input
            name="berat"
            value={form.pribadi.berat}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Berat Badan"
          />
          {errors['pribadi.berat'] && (
            <p className="text-sm text-red-600 mt-1">{errors['pribadi.berat']}</p>
          )}
        </div>
        <div>
          <input
            name="hobi"
            value={form.pribadi.hobi}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Hobi"
          />
          {errors['pribadi.hobi'] && (
            <p className="text-sm text-red-600 mt-1">{errors['pribadi.hobi']}</p>
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
