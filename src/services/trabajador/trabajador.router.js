import {Router}from "express"
import {
    crearTrabajador,
    eliminartrabajador,
    actualizarTrabajador,
    listarTrabajador
} from "./controller/trabajador.controller.js"
import verifiTokenAdministrador from "../../middleware/VerificarTokenAdministrador.js"
import verifi from "../../middleware/verifiExpres.js"
import { check } from "express-validator"
import validarCIcubano from "../../middleware/verificarCI.js"

const trabajadorRouter = Router()

trabajadorRouter
.post("/traba",[verifiTokenAdministrador,validarCIcubano, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('descripcion', 'Debe incluir una descripcion').not().isEmpty(),
check('sexo', 'Debe introducir uno de estos caracteres M = Masculino, F = Femenino').not().isEmpty().isLength({min:1, max:1}),
check('ci', 'Debe tener 11 caracteres solamente').isLength({min:11, max:11}),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
    verifi], crearTrabajador)
.put("/traba/:ci",[verifiTokenAdministrador,validarCIcubano, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('descripcion', 'Debe incluir una descripcion').not().isEmpty(),
check('sexo', 'Debe introducir uno de estos caracteres M = Masculino, F = Femenino').not().isEmpty().isLength({min:1, max:1}),
check('ci', 'Debe tener 11 caracteres solamente').isLength({min:11, max:11}),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
    verifi], actualizarTrabajador)
.get("/traba",verifiTokenAdministrador, listarTrabajador)
.delete("/traba/:ci",verifiTokenAdministrador, eliminartrabajador)

export default trabajadorRouter