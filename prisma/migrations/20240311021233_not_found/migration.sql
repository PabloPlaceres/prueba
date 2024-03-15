/*
  Warnings:

  - You are about to drop the `Administrador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paquete` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Repartidor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trabajador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Paquete" DROP CONSTRAINT "Paquete_clienID_fkey";

-- DropForeignKey
ALTER TABLE "Paquete" DROP CONSTRAINT "Paquete_repaID_fkey";

-- DropForeignKey
ALTER TABLE "Trabajador" DROP CONSTRAINT "Trabajador_adminID_fkey";

-- DropForeignKey
ALTER TABLE "Trabajador" DROP CONSTRAINT "Trabajador_repaId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_adminID_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_repaId_fkey";

-- DropTable
DROP TABLE "Administrador";

-- DropTable
DROP TABLE "Cliente";

-- DropTable
DROP TABLE "Paquete";

-- DropTable
DROP TABLE "Repartidor";

-- DropTable
DROP TABLE "Trabajador";

-- DropTable
DROP TABLE "Usuario";
