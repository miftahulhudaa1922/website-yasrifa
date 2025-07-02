/*
  Warnings:

  - You are about to drop the `Pendaftaran` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Pendaftaran";

-- CreateTable
CREATE TABLE "Pendaftar" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "agama" TEXT NOT NULL,
    "asalSekolah" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "noUjian" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "desa" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kabupaten" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "tinggalDengan" TEXT NOT NULL,
    "ayahNama" TEXT NOT NULL,
    "ayahLahir" TEXT NOT NULL,
    "ayahPendidikan" TEXT NOT NULL,
    "ayahPekerjaan" TEXT NOT NULL,
    "ayahPenghasilan" TEXT NOT NULL,
    "ibuNama" TEXT NOT NULL,
    "ibuLahir" TEXT NOT NULL,
    "ibuPendidikan" TEXT NOT NULL,
    "ibuPekerjaan" TEXT NOT NULL,
    "ibuPenghasilan" TEXT NOT NULL,
    "telp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "saudara" INTEGER NOT NULL,
    "tinggi" INTEGER NOT NULL,
    "berat" INTEGER NOT NULL,
    "hobi" TEXT NOT NULL,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pendaftar_pkey" PRIMARY KEY ("id")
);
