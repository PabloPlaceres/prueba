-- CreateTable
CREATE TABLE "Cliente" (
    "idCliente" SERIAL NOT NULL,
    "telefono" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "direccion" TEXT,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Cliente',

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("idCliente")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "idAdmi" SERIAL NOT NULL,
    "telefono" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'Admin',

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idAdmi")
);

-- CreateTable
CREATE TABLE "Repartidor" (
    "idRepa" SERIAL NOT NULL,
    "telefono" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "usuario" TEXT NOT NULL,
    "password" TEXT NOT NULL,
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
    "repaID" INTEGER NOT NULL,

    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("idPaq")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_idCliente_key" ON "Cliente"("idCliente");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_telefono_key" ON "Cliente"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_usuario_key" ON "Cliente"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_password_key" ON "Cliente"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_idAdmi_key" ON "Administrador"("idAdmi");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_telefono_key" ON "Administrador"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_usuario_key" ON "Administrador"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_password_key" ON "Administrador"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Repartidor_idRepa_key" ON "Repartidor"("idRepa");

-- CreateIndex
CREATE UNIQUE INDEX "Repartidor_telefono_key" ON "Repartidor"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Repartidor_usuario_key" ON "Repartidor"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Repartidor_password_key" ON "Repartidor"("password");

-- CreateIndex
CREATE UNIQUE INDEX "Repartidor_licencia_key" ON "Repartidor"("licencia");

-- CreateIndex
CREATE UNIQUE INDEX "Paquete_idPaq_key" ON "Paquete"("idPaq");

-- CreateIndex
CREATE UNIQUE INDEX "Paquete_repaID_key" ON "Paquete"("repaID");

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_repaID_fkey" FOREIGN KEY ("repaID") REFERENCES "Repartidor"("idRepa") ON DELETE RESTRICT ON UPDATE CASCADE;
