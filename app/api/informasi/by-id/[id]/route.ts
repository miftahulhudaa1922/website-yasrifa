import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import slugify from 'slugify'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() // Ambil ID dari path

    if (!id) {
      return NextResponse.json({ message: 'ID tidak ditemukan di URL' }, { status: 400 })
    }

    const formData = await req.formData()

    const title = formData.get('title')?.toString() || ''
    const content = formData.get('content')?.toString() || ''
    const excerpt = formData.get('excerpt')?.toString() || content.slice(0, 150)

    const file = formData.get('image') as File | null

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Judul dan konten wajib diisi' },
        { status: 400 }
      )
    }

    let imageUrl = ''

    if (file && typeof file === 'object') {
      const buffer = Buffer.from(await file.arrayBuffer())

      const upload = await new Promise<{ secure_url: string }>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'informasi',
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) reject(error)
            else resolve(result as { secure_url: string })
          }
        ).end(buffer)
      })

      imageUrl = upload.secure_url
    }

    const slug = slugify(title)

    const updated = await prisma.informasi.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        slug,
        ...(imageUrl && { image: imageUrl }),
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('❌ Error updating informasi:', error)
    return NextResponse.json(
      { message: 'Gagal memperbarui data' },
      { status: 500 }
    )
  }
}


export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() // Ambil ID dari path

    if (!id) {
      return NextResponse.json({ message: 'ID tidak ditemukan di URL' }, { status: 400 })
    }

    // Pastikan data ada sebelum dihapus
    const existing = await prisma.informasi.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ message: 'Data tidak ditemukan' }, { status: 404 })
    }

    await prisma.informasi.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Berhasil dihapus' })
  } catch (error) {
    console.error('❌ Gagal menghapus:', error)
    return NextResponse.json({ message: 'Gagal menghapus data' }, { status: 500 })
  }
}