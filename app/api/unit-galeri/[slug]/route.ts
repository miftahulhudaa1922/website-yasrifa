import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  try {
    const body = await req.json()

    const { caption, image } = body

    if (!image) {
      return NextResponse.json(
        { message: 'Gambar wajib diunggah' },
        { status: 400 }
      )
    }

    // ✅ Simpan ke database (tidak perlu upload ke Cloudinary lagi,
    // karena frontend sudah upload ke /api/upload terpisah)
    const galeri = await prisma.unitGaleri.create({
      data: {
        unitSlug: slug,
        caption: caption || '',
        image, // sudah URL Cloudinary
      },
    })

    return NextResponse.json(galeri)
  } catch (error) {
    console.error('❌ Gagal menyimpan galeri:', error)
    return NextResponse.json(
      { message: 'Gagal menyimpan data galeri' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params

  console.log('🔎 slug:', slug)

  try {
    const galeriList = await prisma.unitGaleri.findMany({
      where: { unitSlug: slug },
      orderBy: { createdAt: 'desc' },
    })

    console.log('🎯 galeriList:', galeriList)

    return NextResponse.json({galeriList})
  } catch (error) {
    console.error('❌ Gagal mengambil data galeri:', error)
    return NextResponse.json(
      { message: 'Gagal mengambil data galeri' },
      { status: 500 }
    )
  }
}

