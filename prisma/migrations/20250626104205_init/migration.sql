-- CreateTable
CREATE TABLE "Pendaftaran" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenjang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pendaftaran_pkey" PRIMARY KEY ("id")
);
