import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  try {
    const data = await prisma.unitSlider.findMany({
      where: { unitSlug: slug },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET /unit-slider error:', error)
    return NextResponse.json(
      { message: 'Gagal mengambil data' },
      { status: 500 }
    )
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  try {
    const formData = await req.formData()
    const title = formData.get('title') as string
    const image = formData.get('image') as string // ✅ URL string dari frontend

    if (!title || !image) {
      return NextResponse.json(
        { message: 'Judul dan URL gambar wajib diisi' },
        { status: 400 }
      )
    }

    const created = await prisma.unitSlider.create({
      data: {
        title,
        image,
        unitSlug: slug,
      },
    })

    return NextResponse.json(created)
  } catch (error) {
    console.error('POST /unit-slider error:', error)
    return NextResponse.json(
      { message: 'Gagal menyimpan data slider' },
      { status: 500 }
    )
  }
}

