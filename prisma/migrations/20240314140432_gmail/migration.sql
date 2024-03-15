/*
  Warnings:

  - A unique constraint covering the columns `[gmail]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Made the column `apellido` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "apellido" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_gmail_key" ON "Cliente"("gmail");
