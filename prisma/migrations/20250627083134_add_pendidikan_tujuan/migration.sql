/*
  Warnings:

  - Added the required column `pendidikanTujuan` to the `Pendaftar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pendaftar" ADD COLUMN     "pendidikanTujuan" TEXT NOT NULL;
