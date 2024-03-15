/*
  Warnings:

  - Made the column `apellido` on table `Trabajador` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trabajador" ALTER COLUMN "apellido" SET NOT NULL;
