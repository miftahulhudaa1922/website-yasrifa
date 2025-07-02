// app/api/all-galeri/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const galeri = await prisma.unitGaleri.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ galeri })
  } catch (error) {
    console.error('❌ Gagal mengambil semua galeri:', error)
    return NextResponse.json(
      { message: 'Gagal mengambil semua galeri' },
      { status: 500 }
    )
  }
}
