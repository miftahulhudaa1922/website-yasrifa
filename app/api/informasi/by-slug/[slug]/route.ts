// app/api/informasi/by-slug/[slug]/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  // Ambil slug dari URL
  const url = new URL(req.url)
  const slug = url.pathname.split('/').pop() // atau parsing dengan regex sesuai kebutuhan

  if (!slug) {
    return NextResponse.json({ message: 'Slug tidak ditemukan' }, { status: 400 })
  }

  try {
    const informasi = await prisma.informasi.findUnique({
      where: { slug },
    })

    if (!informasi) {
      return NextResponse.json({ message: 'Informasi tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(informasi)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Gagal mengambil detail' }, { status: 500 })
  }
}
