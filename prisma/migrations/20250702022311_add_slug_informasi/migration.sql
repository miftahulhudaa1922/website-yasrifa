/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Informasi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `excerpt` to the `Informasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Informasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Informasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Informasi" ADD COLUMN     "excerpt" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Informasi_slug_key" ON "Informasi"("slug");
