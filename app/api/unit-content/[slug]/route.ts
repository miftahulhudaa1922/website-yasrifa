// app/api/unit-content/[slug]/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET: Ambil konten unit pendidikan berdasarkan slug
export async function GET(
  _: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

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

// PUT: Perbarui sejarah, visi, misi
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  const body = await req.json()
  const { sejarah, visi, misi } = body

  try {
    const updated = await prisma.unitContent.update({
      where: { slug },
      data: {
        sejarah,
        visi,
        misi,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT UnitContent error:', error)
    return NextResponse.json({ message: 'Gagal memperbarui konten' }, { status: 500 })
  }
}
