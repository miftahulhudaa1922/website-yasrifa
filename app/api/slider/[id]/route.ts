import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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

    // ✅ Upload langsung ke Cloudinary
    try {
      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${buffer.toString("base64")}`,
        { folder: "global-slider" }
      );
      imageUrl = result.secure_url;
    } catch (error) {
      console.error("Upload gagal:", error);
      return NextResponse.json(
        { message: "Upload gambar gagal" },
        { status: 500 }
      );
    }

    // ✅ Hapus gambar lama jika dari Cloudinary
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
      ...(imageUrl ? { image: imageUrl } : {}),
    },
  });

  return NextResponse.json(updated);
}

/**
 * DELETE: Hapus slider dan gambar dari Cloudinary jika ada
 */
export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const slide = await prisma.slider.findUnique({ where: { id } });
  if (!slide) {
    return NextResponse.json(
      { message: "Slider tidak ditemukan" },
      { status: 404 }
    );
  }

  // ✅ Hapus gambar dari Cloudinary jika disimpan di sana
  if (slide.image && slide.image.includes("res.cloudinary.com")) {
    const match = slide.image.match(/\/v\d+\/(.+)\.\w+$/);
    const publicId = match?.[1] ? `global-slider/${match[1]}` : null;
    if (publicId) {
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }
  }

  await prisma.slider.delete({ where: { id } });

  return NextResponse.json({ message: "Slider berhasil dihapus" });
}
