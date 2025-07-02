import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'
import slugify from 'slugify' // gunakan untuk generate slug dari title

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const image = formData.get('image') as File

    if (!title || !content || !image) {
      return NextResponse.json({ message: 'Semua field wajib diisi' }, { status: 400 })
    }

    // Upload ke Cloudinary
    const buffer = Buffer.from(await image.arrayBuffer())

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'informasi' },
        (err, result) => {
          if (err) reject(err)
          else resolve(result)
        }
      ).end(buffer)
    })

    // Buat excerpt otomatis (misalnya 150 karakter pertama dari konten)
    const excerpt = content.substring(0, 150) + (content.length > 150 ? '...' : '')

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
    return NextResponse.json({ message: 'Gagal menyimpan informasi' }, { status: 500 })
  }
}


export async function GET() {
  try {
    const data = await prisma.informasi.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 })
  }
}


