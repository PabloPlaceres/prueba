import { Router } from "express";
import { crearPaqueAdmin,  listarPaquetes, eliminarPaquete, updatePaque } from "./controllers/paquetes.controller.js";
import verifiTokenAdministrador from "../../middleware/VerificarTokenAdministrador.js"
import verificarTokenComun from "../../middleware/verificarTokenComun.js";
import { check } from "express-validator";

const paqueRouter = Router()

paqueRouter
.post("/paque",[verifiTokenAdministrador, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('direccionB', 'De incluir una direccion para el destino').not().isEmpty(),
check('peso', 'Debe incluir el peso del articulo').not().isEmpty().isFloat()], crearPaqueAdmin)
.get("/paque",verificarTokenComun,listarPaquetes)
.put("/paque/:id",[verifiTokenAdministrador], updatePaque)
.delete("/paque/:id",verifiTokenAdministrador, eliminarPaquete)

export default paqueRouter