/*
  Warnings:

  - You are about to drop the column `partnerId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `partnerId` on the `CoverageArea` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coverageAreaId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverageAreaId` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "CoverageArea" DROP CONSTRAINT "CoverageArea_partnerId_fkey";

-- DropIndex
DROP INDEX "Address_partnerId_key";

-- DropIndex
DROP INDEX "CoverageArea_partnerId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "partnerId";

-- AlterTable
ALTER TABLE "CoverageArea" DROP COLUMN "partnerId",
ALTER COLUMN "coordinates" SET DATA TYPE TEXT[];

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "coverageAreaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Partner_coverageAreaId_key" ON "Partner"("coverageAreaId");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_addressId_key" ON "Partner"("addressId");

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_coverageAreaId_fkey" FOREIGN KEY ("coverageAreaId") REFERENCES "CoverageArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
