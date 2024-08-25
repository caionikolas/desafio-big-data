/*
  Warnings:

  - The primary key for the `images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `URL` on the `images` table. All the data in the column will be lost.
  - The `id` column on the `images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `url` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_(user_id)_fkey";

-- AlterTable
ALTER TABLE "images" DROP CONSTRAINT "images_pkey",
DROP COLUMN "URL",
ADD COLUMN     "upload_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_(user_id)_fkey" FOREIGN KEY ("(user_id)") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
