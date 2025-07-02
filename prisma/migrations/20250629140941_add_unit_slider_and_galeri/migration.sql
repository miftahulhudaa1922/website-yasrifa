-- CreateTable
CREATE TABLE "UnitSlider" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "unitSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitSlider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitGaleri" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "caption" TEXT,
    "unitSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitGaleri_pkey" PRIMARY KEY ("id")
);
