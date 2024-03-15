import { Router } from "express";
import { crearCliente, eliminarCliente, listarCliente, updateClienteDatos } from "./controllers/cliente.controller.js";
import { check } from "express-validator";
import verifi from "../../middleware/verifiExpres.js";
import verifiTokenAdministrador from "../../middleware/VerificarTokenAdministrador.js"


const clienteRouter = Router()

clienteRouter
.post("/cliente",[verifiTokenAdministrador, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
check('gmail', 'Debe introducir un gmail').isEmail(), verifi], crearCliente)
.get("/cliente",verifiTokenAdministrador, listarCliente)
.put("/cliente/:id",[verifiTokenAdministrador, check('nombre', 'Debe incluir un nombre').not().isEmpty(),
check('apellido', 'De incluir un apellido').not().isEmpty(),
check('telefono', 'Debe tener 8 caracteres').isLength({max:8, min:8}),
check('gmail', 'Debe introducir un gmail').isEmail(), verifi], updateClienteDatos)
.delete("/cliente/:id",verifiTokenAdministrador, eliminarCliente)


export default clienteRouter