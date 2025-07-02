import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { pendaftarSchema } from '@/schemas/pendaftarSchema'
import { renderToBuffer } from '@react-pdf/renderer'
import PendaftarDocument from '@/lib/pdf/PendaftarDocument'
import React, { createElement } from 'react'
import cloudinary from '@/lib/cloudinary'

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const foto = data.get('foto') as File

    if (!foto || !(foto instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Foto tidak valid.' },
        { status: 400 }
      )
    }

    const rawData = Object.fromEntries(data.entries())
    const result = pendaftarSchema.safeParse(rawData)
    if (!result.success) {
      console.error('Validasi gagal:', result.error.flatten().fieldErrors)
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const validatedData = result.data

    // ✅ Upload foto ke Cloudinary
    const bytes = await foto.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'pendaftar' },
        (err, result) => {
          if (err) return reject(err)
          resolve(result)
        }
      ).end(buffer)
    })

    const imageUrl = uploadResult.secure_url

    // 🖼️ Buat imageBase64 untuk PDF
    const base64Image = buffer.toString('base64')
    const imageMimeType = foto.type
    const base64ImageUrl = `data:${imageMimeType};base64,${base64Image}`

    // ✅ Simpan ke database
    const newPendaftar = await prisma.pendaftar.create({
      data: {
        ...validatedData,
        tanggalLahir: new Date(validatedData.tanggalLahir),
        foto: imageUrl,
      },
    })

    // ✅ Generate PDF
    const pdfElement = createElement(PendaftarDocument as React.FC<any>, {
      data: validatedData,
      imageBase64: base64ImageUrl,
    })

    const pdfBuffer = await renderToBuffer(pdfElement)
    const pdfFilename = `${Date.now()}-${validatedData.nama.replace(/\s+/g, '_')}.pdf`
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    await mkdir(uploadDir, { recursive: true })
    const pdfPath = path.join(uploadDir, pdfFilename)
    await writeFile(pdfPath, pdfBuffer)

    return NextResponse.json({
      success: true,
      data: newPendaftar,
      pdfUrl: `/uploads/${pdfFilename}`,
    })
  } catch (error) {
    console.error('Gagal menyimpan pendaftar:', error)
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat menyimpan data.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const pendaftar = await prisma.pendaftar.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: pendaftar })
  } catch (error) {
    console.error('Gagal mengambil data pendaftar:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data pendaftar.' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const deleted = await prisma.pendaftar.deleteMany({})
    return NextResponse.json({
      success: true,
      message: `${deleted.count} data pendaftar berhasil dihapus.`,
    })
  } catch (error) {
    console.error('Gagal menghapus semua pendaftar:', error)
    return NextResponse.json(
      { success: false, error: 'Gagal menghapus semua pendaftar.' },
      { status: 500 }
    )
  }
}
