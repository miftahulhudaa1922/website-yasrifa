-- CreateEnum
CREATE TYPE "ProfilType" AS ENUM ('SEJARAH', 'SAMBUTAN', 'VISI_MISI');

-- CreateTable
CREATE TABLE "Slider" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profil" (
    "id" TEXT NOT NULL,
    "type" "ProfilType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitPendidikan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitPendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Informasi" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Informasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Galeri" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kontak" (
    "id" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "email" TEXT,
    "telp" TEXT,
    "mapsUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kontak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnitPendidikan_nama_key" ON "UnitPendidikan"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "UnitPendidikan_slug_key" ON "UnitPendidikan"("slug");
