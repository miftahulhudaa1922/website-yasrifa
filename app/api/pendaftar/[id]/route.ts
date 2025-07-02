import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import cloudinary from '@/lib/cloudinary'

export async function DELETE(req: NextRequest) {
  try {
    // Ambil ID dari URL
    const id = req.nextUrl.pathname.split('/').pop()

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID tidak ditemukan di URL.' },
        { status: 400 }
      )
    }

    // Cari pendaftar
    const existing = await prisma.pendaftar.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Pendaftar tidak ditemukan.' },
        { status: 404 }
      )
    }

    // Hapus dari Cloudinary jika ada foto
    if (existing.foto && existing.foto.includes('res.cloudinary.com')) {
      const match = existing.foto.match(/\/v\d+\/(.+)\.\w+$/)
      const publicId = match?.[1] ? `pendaftar/${match[1]}` : null

      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    }

    // Hapus dari database
    const deleted = await prisma.pendaftar.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    console.error('❌ Gagal menghapus pendaftar:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus pendaftar.' },
      { status: 500 }
    )
  }
}
