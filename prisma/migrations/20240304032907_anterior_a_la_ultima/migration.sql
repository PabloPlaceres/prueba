/*
  Warnings:

  - You are about to drop the column `apellido` on the `Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `rol` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `apellido` on the `Repartidor` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Repartidor` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Repartidor` table. All the data in the column will be lost.
  - You are about to drop the column `clienteID` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cedula]` on the table `Administrador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_clienteID_fkey";

-- DropIndex
DROP INDEX "Usuario_clienteID_key";

-- AlterTable
ALTER TABLE "Administrador" DROP COLUMN "apellido",
DROP COLUMN "nombre",
DROP COLUMN "telefono",
ADD COLUMN     "cedula" TEXT;

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "rol";

-- AlterTable
ALTER TABLE "Repartidor" DROP COLUMN "apellido",
DROP COLUMN "nombre",
DROP COLUMN "telefono";

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "clienteID";

-- CreateTable
CREATE TABLE "Trabajador" (
    "ci" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "telefono" TEXT NOT NULL,

    CONSTRAINT "Trabajador_pkey" PRIMARY KEY ("ci")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_ci_key" ON "Trabajador"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_cedula_key" ON "Administrador"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_idUsuario_key" ON "Usuario"("idUsuario");
