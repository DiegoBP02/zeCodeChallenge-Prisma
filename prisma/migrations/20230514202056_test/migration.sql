/*
  Warnings:

  - You are about to drop the column `coverageAreaId` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the `CoverageArea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_coverageAreaId_fkey";

-- DropIndex
DROP INDEX "Partner_coverageAreaId_key";

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "coverageAreaId";

-- DropTable
DROP TABLE "CoverageArea";
