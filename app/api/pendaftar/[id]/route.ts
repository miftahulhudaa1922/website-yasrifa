import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Ambil data pendaftar
    const existing = await prisma.pendaftar.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Pendaftar tidak ditemukan.' },
        { status: 404 }
      )
    }

    // ✅ Hapus gambar dari Cloudinary jika di-host di sana
    if (existing.foto && existing.foto.includes('res.cloudinary.com')) {
      const match = existing.foto.match(/\/v\d+\/(.+)\.\w+$/)
      const publicId = match?.[1] ? `pendaftar/${match[1]}` : null
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    }

    // Hapus data dari DB
    const deleted = await prisma.pendaftar.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    console.error('Gagal menghapus pendaftar:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus pendaftar.' },
      { status: 500 }
    )
  }
}
