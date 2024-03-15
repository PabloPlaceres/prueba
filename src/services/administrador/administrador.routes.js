import { Router } from "express";
import { crearAdmin, eliminarAdmin, invetario, listarAdmin, updateAdministrador } from "./controllers/administradores.controllers.js";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import verifiTokenAdministrador from "../../middleware/VerificarTokenAdministrador.js"
import validarCIcubano from "../../middleware/verificarCI.js";


const admiRouter = Router()

admiRouter
.post("/admin",[validarCIcubano, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('descripcion', 'Debe incluir una descripcion').not().isEmpty(),
check('sexo', 'Debe introducir uno de estos caracteres M = Masculino, F = Femenino').not().isEmpty().isLength({min:1, max:1}),
check('ci', 'Debe tener 11 caracteres solamente').isLength({min:11, max:11}),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
check('password', 'Debe poseer 8 caracteres').isLength({min:8}),
    verifi], crearAdmin)
.get("/admin", listarAdmin)
.put("/admin/:id",[verifiTokenAdministrador, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('descripcion', 'Debe incluir una descripcion').not().isEmpty(),
check('sexo', 'Debe introducir uno de estos caracteres M = Masculino, F = Femenino').not().isEmpty().isLength({min:1, max:1}),
check('ci', 'Debe tener 11 caracteres solamente').isLength({min:11, max:11}),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
check('password', 'Debe poseer 8 caracteres').isLength({min:8, max:8}),
    verifi], updateAdministrador)
.delete("/admin/:id",verifiTokenAdministrador, eliminarAdmin)
.get("/admin/invetario",verifiTokenAdministrador, invetario)
export default admiRouter