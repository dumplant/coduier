/*
  Warnings:

  - The values [MODERATOR,GUEST] on the enum `MemberRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Component` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MemberRole_new" AS ENUM ('ADMIN', 'DEVELOPER');
ALTER TABLE "Member" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Member" ALTER COLUMN "role" TYPE "MemberRole_new" USING ("role"::text::"MemberRole_new");
ALTER TYPE "MemberRole" RENAME TO "MemberRole_old";
ALTER TYPE "MemberRole_new" RENAME TO "MemberRole";
DROP TYPE "MemberRole_old";
ALTER TABLE "Member" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_projectId_fkey";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER';

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "code" SET DEFAULT 'export default function Empty() {return <div>暂无内容</div>;}';

-- DropTable
DROP TABLE "Component";

-- DropTable
DROP TABLE "Template";
