import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

/**
 * PUT: Update data slider, termasuk ganti gambar jika ada
 */
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop(); // Ambil id dari URL

    if (!id) {
      return NextResponse.json({ message: "ID tidak ditemukan" }, { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const image = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json({ message: "Judul wajib diisi" }, { status: 400 });
    }

    let imageUrl: string | undefined;

    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const mimeType = image.type;

      // Upload gambar baru ke Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${buffer.toString("base64")}`,
        { folder: "global-slider" }
      );
      imageUrl = result.secure_url;

      // Hapus gambar lama dari Cloudinary
      const old = await prisma.slider.findUnique({ where: { id } });
      if (old?.image?.includes("res.cloudinary.com")) {
        const match = old.image.match(/\/v\d+\/(.+)\.\w+$/);
        const publicId = match?.[1] ? `global-slider/${match[1]}` : null;
        if (publicId) {
          await cloudinary.uploader.destroy(publicId).catch(() => {});
        }
      }
    }

    const updated = await prisma.slider.update({
      where: { id },
      data: {
        title,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Gagal update slider:", error);
    return NextResponse.json({ message: "Gagal update slider" }, { status: 500 });
  }
}

/**
 * DELETE: Hapus slider dan gambar dari Cloudinary jika ada
 */
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop(); // Ambil id dari URL

    if (!id) {
      return NextResponse.json({ message: "ID tidak ditemukan" }, { status: 400 });
    }

    const slide = await prisma.slider.findUnique({ where: { id } });
    if (!slide) {
      return NextResponse.json({ message: "Slider tidak ditemukan" }, { status: 404 });
    }

    // Hapus gambar dari Cloudinary
    if (slide.image?.includes("res.cloudinary.com")) {
      const match = slide.image.match(/\/v\d+\/(.+)\.\w+$/);
      const publicId = match?.[1] ? `global-slider/${match[1]}` : null;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }

    await prisma.slider.delete({ where: { id } });

    return NextResponse.json({ message: "Slider berhasil dihapus" });
  } catch (error) {
    console.error("❌ Gagal hapus slider:", error);
    return NextResponse.json({ message: "Gagal menghapus slider" }, { status: 500 });
  }
}
