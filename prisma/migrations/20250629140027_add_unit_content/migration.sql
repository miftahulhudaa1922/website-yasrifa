/*
  Warnings:

  - You are about to drop the column `caption` on the `Galeri` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Galeri" DROP COLUMN "caption",
ADD COLUMN     "title" TEXT,
ADD COLUMN     "unitSlug" TEXT;

-- AlterTable
ALTER TABLE "Slider" ADD COLUMN     "unitSlug" TEXT;

-- CreateTable
CREATE TABLE "UnitContent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sejarah" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnitContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnitContent_slug_key" ON "UnitContent"("slug");

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_unitSlug_fkey" FOREIGN KEY ("unitSlug") REFERENCES "UnitContent"("slug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Galeri" ADD CONSTRAINT "Galeri_unitSlug_fkey" FOREIGN KEY ("unitSlug") REFERENCES "UnitContent"("slug") ON DELETE SET NULL ON UPDATE CASCADE;
