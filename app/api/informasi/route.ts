import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'
import slugify from 'slugify'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const title = formData.get('title')
    const content = formData.get('content')
    const image = formData.get('image') as File | null

    // Validasi field
    if (typeof title !== 'string' || typeof content !== 'string' || !image) {
      return NextResponse.json(
        { message: 'Semua field (judul, konten, gambar) wajib diisi' },
        { status: 400 }
      )
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await image.arrayBuffer())

    // Upload ke Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'informasi',
          resource_type: 'image',
        },
        (err, result) => {
          if (err || !result) {
            return reject(err || new Error('Upload ke Cloudinary gagal'))
          }
          resolve(result as { secure_url: string })
        }
      ).end(buffer)
    })

    // Generate excerpt
    const excerpt = content.slice(0, 150) + (content.length > 150 ? '...' : '')

    // Simpan ke database
    const informasi = await prisma.informasi.create({
      data: {
        title,
        slug: slugify(title, { lower: true, strict: true }),
        excerpt,
        content,
        image: uploadResult.secure_url,
      },
    })

    return NextResponse.json(informasi)
  } catch (error) {
    console.error('❌ Gagal menyimpan informasi:', error)
    return NextResponse.json(
      { message: 'Gagal menyimpan informasi', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const data = await prisma.informasi.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ data })
  } catch (error) {
    console.error('❌ Gagal mengambil data:', error)
    return NextResponse.json(
      { message: 'Gagal mengambil data', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
