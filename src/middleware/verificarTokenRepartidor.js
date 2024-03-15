import { request, response } from "express";
import JWT from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const verifiTokenRepartidor = async(req = request, res = response, next)=>{

    const token = req.header('x-Token')
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {id, rol} = JWT.verify(token, process.env.SECRETORPRIVATEKEY)
            if (rol !== 'Repa') {
                res.status(401).json({
                    msg: 'Acceso solo a Repartidores'
            })
        }

                const users = await prisma.repartidor.findUnique({where: {idRepa:id}})
                req.users = users  
                    if(!users){return res.status(401).json({msg: 'No existes en db'}) }

                    console.log(rol)
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

export default verifiTokenRepartidor