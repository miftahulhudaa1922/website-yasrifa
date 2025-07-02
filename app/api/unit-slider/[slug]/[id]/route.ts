import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  const { slug, id } = await context.params // ✅ gunakan await

  const formData = await req.formData()
  const title = formData.get('title') as string
  const image = formData.get('image') as File | null

  const data: { title?: string; image?: string } = { title }

  if (image && image.size > 0) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // ✅ Upload gambar baru ke Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'unit-slider' },
        (err, result) => {
          if (err) return reject(err)
          resolve(result)
        }
      ).end(buffer)
    })

    data.image = uploadResult.secure_url

    // ✅ Hapus gambar lama dari Cloudinary (jika ada)
    const existing = await prisma.unitSlider.findUnique({ where: { id } })
    if (existing?.image && existing.image.includes('res.cloudinary.com')) {
      const match = existing.image.match(/\/v\d+\/(.+)\.\w+$/)
      const publicId = match?.[1] ? `unit-slider/${match[1]}` : null
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    }
  }

  const updated = await prisma.unitSlider.update({
    where: { id },
    data,
  })

  return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ slug: string; id: string }> }
) {
  const { id } = await context.params // ✅ gunakan await

  const existing = await prisma.unitSlider.findUnique({ where: { id } })
  if (existing?.image && existing.image.includes('res.cloudinary.com')) {
    const match = existing.image.match(/\/v\d+\/(.+)\.\w+$/)
    const publicId = match?.[1] ? `unit-slider/${match[1]}` : null
    if (publicId) {
      await cloudinary.uploader.destroy(publicId).catch(() => {})
    }
  }

  await prisma.unitSlider.delete({ where: { id } })

  return NextResponse.json({ message: 'Slide berhasil dihapus' })
}
