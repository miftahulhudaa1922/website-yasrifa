import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

/**
 * PUT: update caption atau gambar galeri
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await context.params

  try {
    const formData = await req.formData()
    const caption = formData.get('caption') as string | null
    const image = formData.get('image') as File | null

    let updatedData: any = {}

    if (caption !== null) {
      updatedData.caption = caption
    }

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // ✅ Upload gambar baru ke Cloudinary
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'unit-galeri' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        ).end(buffer)
      })

      updatedData.image = uploadResult.secure_url

      // ✅ Hapus gambar lama dari Cloudinary (jika berasal dari Cloudinary)
      const existing = await prisma.unitGaleri.findUnique({ where: { id } })
      if (existing?.image && existing.image.includes('res.cloudinary.com')) {
        const publicIdMatch = existing.image.match(/\/v\d+\/(.+)\.\w+$/)
        const publicId = publicIdMatch?.[1] ?? null
        if (publicId) {
          await cloudinary.uploader.destroy(`unit-galeri/${publicId}`).catch(() => {})
        }
      }
    }

    const updated = await prisma.unitGaleri.update({
      where: { id },
      data: updatedData,
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('❌ Error updating galeri:', error)
    return NextResponse.json({ message: 'Gagal update galeri' }, { status: 500 })
  }
}

/**
 * DELETE: hapus galeri dan gambar dari Cloudinary jika ada
 */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  const { id } = await context.params

  try {
    const galeri = await prisma.unitGaleri.findUnique({ where: { id } })
    if (!galeri) {
      return NextResponse.json({ message: 'Galeri tidak ditemukan' }, { status: 404 })
    }

    // ✅ Hapus gambar dari Cloudinary jika disimpan di sana
    if (galeri.image && galeri.image.includes('res.cloudinary.com')) {
      const publicIdMatch = galeri.image.match(/\/v\d+\/(.+)\.\w+$/)
      const publicId = publicIdMatch?.[1] ?? null
      if (publicId) {
        await cloudinary.uploader.destroy(`unit-galeri/${publicId}`).catch(() => {})
      }
    }

    await prisma.unitGaleri.delete({ where: { id } })

    return NextResponse.json({ message: 'Berhasil dihapus' })
  } catch (error) {
    console.error('❌ Error deleting galeri:', error)
    return NextResponse.json({ message: 'Gagal menghapus galeri' }, { status: 500 })
  }
}
