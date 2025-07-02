import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await prisma.profil.findMany({
    orderBy: { createdAt: 'asc' },
  })

  // Mengembalikan bentuk objek { sejarah, sambutan, visiMisi }
  const result = {
    sejarah: data.find((item) => item.type === 'SEJARAH')?.content || '',
    sambutan: data.find((item) => item.type === 'SAMBUTAN')?.content || '',
    visiMisi: data.find((item) => item.type === 'VISI_MISI')?.content || '',
  }

  return NextResponse.json(result)
}

export async function POST(req: Request) {
  const { sejarah, sambutan, visiMisi } = await req.json()

  // Gunakan upsert untuk tiap jenis profil
  const sejarahResult = await prisma.profil.upsert({
    where: { type: 'SEJARAH' },
    update: { content: sejarah, title: 'Sejarah' },
    create: {
      type: 'SEJARAH',
      title: 'Sejarah',
      content: sejarah,
    },
  })

  const sambutanResult = await prisma.profil.upsert({
    where: { type: 'SAMBUTAN' },
    update: { content: sambutan, title: 'Sambutan' },
    create: {
      type: 'SAMBUTAN',
      title: 'Sambutan',
      content: sambutan,
    },
  })

  const visiMisiResult = await prisma.profil.upsert({
    where: { type: 'VISI_MISI' },
    update: { content: visiMisi, title: 'Visi dan Misi' },
    create: {
      type: 'VISI_MISI',
      title: 'Visi dan Misi',
      content: visiMisi,
    },
  })

  return NextResponse.json({
    success: true,
    message: 'Profil berhasil diperbarui',
    data: {
      sejarah: sejarahResult,
      sambutan: sambutanResult,
      visiMisi: visiMisiResult,
    },
  })
}
