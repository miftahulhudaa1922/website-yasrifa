// app/api/unit-content/[slug]/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// ✅ GET: Ambil konten unit pendidikan berdasarkan slug
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop() // Ambil slug dari path

  if (!slug) {
    return NextResponse.json({ message: 'Slug tidak ditemukan' }, { status: 400 })
  }

  try {
    const unit = await prisma.unitContent.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        sejarah: true,
        visi: true,
        misi: true,
      },
    })

    if (!unit) {
      return NextResponse.json({ message: 'Unit tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(unit)
  } catch (error) {
    console.error('GET UnitContent error:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan saat mengambil data' }, { status: 500 })
  }
}

// ✅ PUT: Perbarui sejarah, visi, misi
export async function PUT(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop() // Ambil slug dari path

  if (!slug) {
    return NextResponse.json({ message: 'Slug tidak ditemukan' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { sejarah, visi, misi } = body

    const updated = await prisma.unitContent.update({
      where: { slug },
      data: { sejarah, visi, misi },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT UnitContent error:', error)
    return NextResponse.json({ message: 'Gagal memperbarui konten' }, { status: 500 })
  }
}
