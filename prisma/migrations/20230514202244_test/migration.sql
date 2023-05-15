/*
  Warnings:

  - A unique constraint covering the columns `[coverageAreaId]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coverageAreaId` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "coverageAreaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CoverageArea" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "coordinates" JSONB NOT NULL,

    CONSTRAINT "CoverageArea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_coverageAreaId_key" ON "Partner"("coverageAreaId");

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_coverageAreaId_fkey" FOREIGN KEY ("coverageAreaId") REFERENCES "CoverageArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
