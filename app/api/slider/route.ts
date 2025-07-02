import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

/**
 * GET: Ambil semua slider
 */
export async function GET() {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data: sliders }) // ✅ konsisten pakai `data`
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data slider' }, { status: 500 })
  }
}

/**
 * POST: Tambah slider baru
 */
export async function POST(req: Request) {
  const formData = await req.formData()
  const title = formData.get('title') as string
  const image = formData.get('image') as File

  if (!title || !image) {
    return NextResponse.json({ message: 'Judul dan gambar wajib diisi' }, { status: 400 })
  }

  const bytes = await image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // ✅ Upload ke Cloudinary
  const uploadResult = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'global-slider' },
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    ).end(buffer)
  })

  const slider = await prisma.slider.create({
    data: {
      title,
      image: uploadResult.secure_url, // ✅ simpan URL dari Cloudinary
    },
  })

  return NextResponse.json(slider)
}
