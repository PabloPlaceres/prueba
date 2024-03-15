import { Router } from "express";
import clienteRouter from "../services/cliente/cliente.routers.js"
import paqueRouter from "../services/paquete/paquete.routers.js";
import admiRouter from "../services/administrador/administrador.routes.js";
import repaRouter from "../services/repartidor/repartidor.roters.js"
import userRouter from "../services/usuarios/usuarios.router.js";
import trabajadorRouter from "../services/trabajador/trabajador.router.js";
import routerAuth from "../services/auth/autah.router.js";

const router = Router ()

router.use(clienteRouter)
router.use(paqueRouter)
router.use(admiRouter)
router.use(repaRouter)
router.use(userRouter)
router.use(trabajadorRouter)
router.use(routerAuth)

export default router