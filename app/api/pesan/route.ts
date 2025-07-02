import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { nama, email, pesan } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // dikirim ke email pesantren
      subject: `Pesan dari ${nama}`,
      html: `
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${pesan}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Gagal kirim email:', error)
    return NextResponse.json({ message: 'Gagal mengirim email' }, { status: 500 })
  }
}
