/*
  Warnings:

  - Changed the type of `coordinates` on the `CoverageArea` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CoverageArea" DROP COLUMN "coordinates",
ADD COLUMN     "coordinates" JSONB NOT NULL;
