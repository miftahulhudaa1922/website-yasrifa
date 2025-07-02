import cloudinary from "@/lib/cloudinary"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    const result = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Upload timeout after 2 minutes'))
      }, 2 * 60 * 1000)

      cloudinary.uploader.upload_stream(
        { folder: 'images' },
        (err, result) => {
          clearTimeout(timeout)
          if (err) reject(err)
          else resolve(result)
        }
      ).end(buffer)
    })

    return NextResponse.json(result)
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message || 'Cloudinary error' }, { status: 500 })
  }
}
