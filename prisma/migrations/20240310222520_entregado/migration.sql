/*
  Warnings:

  - Added the required column `entregado` to the `Paquete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paquete" ADD COLUMN     "entregado" BOOLEAN NOT NULL;
