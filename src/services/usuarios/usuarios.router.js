import { Router } from "express";
import { listarUsers } from "./controllers/usuarios.controllers.js";
import verifiTokenAdministrador from "../../middleware/VerificarTokenAdministrador.js"

const userRouter = Router ()

userRouter
.get("/user",verifiTokenAdministrador, listarUsers)


export default userRouter