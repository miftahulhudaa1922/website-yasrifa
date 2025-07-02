import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/unit-visimisi/[slug]
export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const unit = await prisma.unitContent.findUnique({
      where: { slug },
      select: { visi: true, misi: true },
    });

    if (!unit) {
      return NextResponse.json(
        { message: "Unit tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ visi: unit.visi, misi: unit.misi });
  } catch (error) {
    console.error("GET /unit-visimisi error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data visi & misi" },
      { status: 500 }
    );
  }
}

// PUT /api/unit-visimisi/[slug]
export async function PUT(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  try {
    const body = await req.json();
    const { visi, misi } = body;

    // Validasi awal
    if (typeof visi !== "string" || typeof misi !== "string") {
      return NextResponse.json(
        { message: "Data visi dan misi tidak valid" },
        { status: 400 }
      );
    }

    // Cek apakah unit sudah ada
    const existing = await prisma.unitContent.findUnique({
      where: { slug },
    });

    let result;
    if (existing) {
      // Update jika sudah ada
      result = await prisma.unitContent.update({
        where: { slug },
        data: { visi, misi },
      });
    } else {
      // Buat baru jika belum ada
      result = await prisma.unitContent.create({
        data: {
          name: slug.replace(/-/g, " ").toUpperCase(),
          slug,
          visi,
          misi,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("PUT /unit-visimisi error:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan visi dan misi" },
      { status: 500 }
    );
  }
}
