'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

interface Pendaftar {
  id: string
  nama: string
  createdAt: string
  jenisKelamin: string
  pendidikanTujuan: string
  asalSekolah: string
}

const COLORS = ['#16a34a', '#facc15', '#f87171', '#60a5fa', '#c084fc', '#fb923c']

export default function AdminOverview() {
  const [jumlah, setJumlah] = useState(0)
  const [byJenisKelamin, setByJenisKelamin] = useState<{ name: string, value: number }[]>([])
  const [byPendidikanTujuan, setByPendidikanTujuan] = useState<{ name: string, value: number }[]>([])
  const [byAsalSekolah, setByAsalSekolah] = useState<{ name: string, value: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/pendaftar')
      const result = await res.json()

      const daftar: Pendaftar[] = result.data || []
      setJumlah(daftar.length)

      const jenisKelaminCount: Record<string, number> = {}
      const pendidikanTujuanCount: Record<string, number> = {}
      const asalSekolahCount: Record<string, number> = {}

      daftar.forEach((p) => {
        jenisKelaminCount[p.jenisKelamin] = (jenisKelaminCount[p.jenisKelamin] || 0) + 1
        pendidikanTujuanCount[p.pendidikanTujuan] = (pendidikanTujuanCount[p.pendidikanTujuan] || 0) + 1
        asalSekolahCount[p.asalSekolah] = (asalSekolahCount[p.asalSekolah] || 0) + 1
      })

      setByJenisKelamin(Object.entries(jenisKelaminCount).map(([name, value]) => ({ name, value })))
      setByPendidikanTujuan(Object.entries(pendidikanTujuanCount).map(([name, value]) => ({ name, value })))
      setByAsalSekolah(Object.entries(asalSekolahCount).map(([name, value]) => ({ name, value })))
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Pendaftar */}
      <div className="bg-white rounded-lg shadow p-4 col-span-1">
        <h2 className="text-lg font-semibold text-gray-700">Total Pendaftar</h2>
        <p className="text-3xl font-bold text-green-700 mt-2">{jumlah}</p>
      </div>

      {/* Grafik Jenis Kelamin */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Berdasarkan Jenis Kelamin</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              dataKey="value"
              data={byJenisKelamin}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {byJenisKelamin.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Grafik Pendidikan Tujuan */}
      <div className="bg-white rounded-lg shadow p-4 col-span-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Berdasarkan Pendidikan Tujuan</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={byPendidikanTujuan}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grafik Asal Sekolah */}
      <div className="bg-white rounded-lg shadow p-4 col-span-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Berdasarkan Asal Sekolah</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={byAsalSekolah}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
