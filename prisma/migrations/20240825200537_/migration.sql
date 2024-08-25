/*
  Warnings:

  - The primary key for the `images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[cloudId]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cloudId` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" DROP CONSTRAINT "images_pkey",
ADD COLUMN     "cloudId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "images_cloudId_key" ON "images"("cloudId");
