-- CreateTable
CREATE TABLE "Trabajador" (
    "ci" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "telefono" TEXT NOT NULL,
    "foto" TEXT,
    "descripcion" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "repaId" INTEGER,
    "adminID" INTEGER,

    CONSTRAINT "Trabajador_pkey" PRIMARY KEY ("ci")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "idCliente" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT,
    "foto" TEXT,
    "gmail" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "idAdmi" SERIAL NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Admin',

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idAdmi")
);

-- CreateTable
CREATE TABLE "Repartidor" (
    "idRepa" SERIAL NOT NULL,
    "licencia" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Repa',

    CONSTRAINT "Repartidor_pkey" PRIMARY KEY ("idRepa")
);

-- CreateTable
CREATE TABLE "Paquete" (
    "idPaq" SERIAL NOT NULL,
    "direccionA" TEXT,
    "direccionB" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "entregado" BOOLEAN NOT NULL DEFAULT false,
    "repaID" INTEGER,
    "clienID" INTEGER,

    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("idPaq")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "repaId" INTEGER,
    "adminID" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_ci_key" ON "Trabajador"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_repaId_key" ON "Trabajador"("repaId");

-- CreateIndex
CREATE UNIQUE INDEX "Trabajador_adminID_key" ON "Trabajador"("adminID");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_idCliente_key" ON "Cliente"("idCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_idAdmi_key" ON "Administrador"("idAdmi");

-- CreateIndex
CREATE UNIQUE INDEX "Repartidor_idRepa_key" ON "Repartidor"("idRepa");

-- CreateIndex
CREATE UNIQUE INDEX "Repartidor_licencia_key" ON "Repartidor"("licencia");

-- CreateIndex
CREATE UNIQUE INDEX "Paquete_idPaq_key" ON "Paquete"("idPaq");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_idUsuario_key" ON "Usuario"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_repaId_key" ON "Usuario"("repaId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_adminID_key" ON "Usuario"("adminID");

-- AddForeignKey
ALTER TABLE "Trabajador" ADD CONSTRAINT "Trabajador_repaId_fkey" FOREIGN KEY ("repaId") REFERENCES "Repartidor"("idRepa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trabajador" ADD CONSTRAINT "Trabajador_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Administrador"("idAdmi") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_repaID_fkey" FOREIGN KEY ("repaID") REFERENCES "Repartidor"("idRepa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_clienID_fkey" FOREIGN KEY ("clienID") REFERENCES "Cliente"("idCliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_repaId_fkey" FOREIGN KEY ("repaId") REFERENCES "Repartidor"("idRepa") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "Administrador"("idAdmi") ON DELETE SET NULL ON UPDATE CASCADE;
