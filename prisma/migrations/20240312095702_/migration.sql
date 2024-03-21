/*
  Warnings:

  - You are about to drop the column `Code` on the `Template` table. All the data in the column will be lost.
  - Added the required column `code` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "Code",
ADD COLUMN     "code" TEXT NOT NULL;
