import { Router } from "express";
import { crearRepa, eliminarRepa, listarRepa, updateRepa, ponerPaqueteComboReparitidor, entregarPaquete } from "./controllers/repartidor.controllers.js";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import verifiTokenAdministrador from "../../middleware/VerificarTokenAdministrador.js"
import verifiTokenRepartidor from "../../middleware/verificarTokenRepartidor.js";
import validarLicencia from "../../middleware/validarLicencia.js";
import validarCIcubano from "../../middleware/verificarCI.js";


const repaRouter = Router()

repaRouter
.post("/repa",[verifiTokenAdministrador ,validarLicencia,validarCIcubano,check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('descripcion', 'Debe incluir una descripcion').not().isEmpty(),
check('sexo', 'Debe introducir uno de estos caracteres M = Masculino, F = Femenino').not().isEmpty().isLength({min:1, max:1}),
check('ci', 'Debe tener 11 caracteres solamente').isLength({min:11, max:11}),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
    verifi], crearRepa)
.get("/repa",verifiTokenAdministrador, listarRepa)
.put("/repa/:id",[verifiTokenAdministrador,validarLicencia,validarCIcubano, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('descripcion', 'Debe incluir una descripcion').not().isEmpty(),
check('sexo', 'Debe introducir uno de estos caracteres M = Masculino, F = Femenino').not().isEmpty().isLength({min:1, max:1}),
check('ci', 'Debe tener 11 caracteres solamente').isLength({min:11, max:11}),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
check('licencia', 'La licencia lleva 7 caracteres').not().isEmpty().isLength({max:7, min: 7}),
    verifi], updateRepa)
.delete("/repa/:id",verifiTokenAdministrador, eliminarRepa)
.put("/repa/entregar",verifiTokenRepartidor, entregarPaquete)
.put("/repa/combo",verifiTokenRepartidor, ponerPaqueteComboReparitidor)

export default repaRouter