/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CoverageArea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Partner` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_coverageAreaId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Address_id_seq";

-- AlterTable
ALTER TABLE "CoverageArea" DROP CONSTRAINT "CoverageArea_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CoverageArea_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CoverageArea_id_seq";

-- AlterTable
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "addressId" SET DATA TYPE TEXT,
ALTER COLUMN "coverageAreaId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Partner_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Partner_id_seq";

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_coverageAreaId_fkey" FOREIGN KEY ("coverageAreaId") REFERENCES "CoverageArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
