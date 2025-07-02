import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/unit-sejarah/[slug]
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const unit = await prisma.unitContent.findUnique({
      where: { slug },
      select: { sejarah: true },
    });

    if (!unit) {
      return NextResponse.json(
        { message: "Unit tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ sejarah: unit.sejarah });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil data sejarah" },
      { status: 500 }
    );
  }
}

// PUT /api/unit-sejarah/[slug]
export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const body = await req.json();
    const { sejarah } = body;

    // Cek apakah data dengan slug ini sudah ada
    const existing = await prisma.unitContent.findUnique({
      where: { slug },
    });

    let result;
    if (existing) {
      // Kalau sudah ada, update
      result = await prisma.unitContent.update({
        where: { slug },
        data: { sejarah },
      });
    } else {
      // Kalau belum ada, buat baru
      result = await prisma.unitContent.create({
        data: {
          name: slug.replace(/-/g, " ").toUpperCase(),
          slug,
          sejarah,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT /unit-sejarah error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui atau membuat sejarah" },
      { status: 500 }
    );
  }
}
