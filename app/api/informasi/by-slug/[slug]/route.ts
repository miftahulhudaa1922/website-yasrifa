import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  try {
    const informasi = await prisma.informasi.findUnique({
      where: { slug },
    })

    if (!informasi) {
      return NextResponse.json({ message: 'Informasi tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(informasi)
  } catch (error) {
    console.error('❌ Error mengambil informasi:', error)
    return NextResponse.json({ message: 'Gagal mengambil detail' }, { status: 500 })
  }
}
