/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Profil` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profil_type_key" ON "Profil"("type");
