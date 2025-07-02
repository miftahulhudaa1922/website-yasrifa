import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Ambil data kontak (GET)
export async function GET() {
  try {
    const kontak = await prisma.kontak.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    if (!kontak) {
      return NextResponse.json({ message: 'Kontak belum diatur' }, { status: 404 })
    }

    return NextResponse.json(kontak)
  } catch (error) {
    console.error('Gagal ambil data kontak:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan' }, { status: 500 })
  }
}

// Tambah/update data kontak (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { alamat, email, telp, mapsUrl } = body

    if (!alamat) {
      return NextResponse.json({ message: 'Alamat wajib diisi' }, { status: 400 })
    }

    // Cek apakah sudah ada kontak
    const existing = await prisma.kontak.findFirst()

    let kontak
    if (existing) {
      kontak = await prisma.kontak.update({
        where: { id: existing.id },
        data: { alamat, email, telp, mapsUrl },
      })
    } else {
      kontak = await prisma.kontak.create({
        data: { alamat, email, telp, mapsUrl },
      })
    }

    return NextResponse.json({ message: 'Kontak berhasil disimpan', kontak }, { status: 200 })
  } catch (error) {
    console.error('Gagal simpan data kontak:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan saat menyimpan' }, { status: 500 })
  }
}
