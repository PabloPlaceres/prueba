import { PrismaClient } from "@prisma/client";
import { request, response } from "express";
import usuarioQuery from "../query/usuario.query.js"
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

export const listarUsers = async (req= request, res= response)=>{
    try {
        const resutl = await usuarioQuery.listarUsuarioQuery()
        res.status(200).json({resutl})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

export const seedUsers = async ()=>{
    try {
        console.log('%csrc/services/usuarios/controllers/usuarios.controllers.js:19 {}', 'color: #007acc;', {});
        const users = await usuarioQuery.listarUsuarioQuery()
        console.log(users)
        if(users?.length === 0){
            console.log('Seeding', users)

            const salt = bcryptjs.genSaltSync()
            const password = bcryptjs.hashSync('Admin1234', salt)
           const res = await usuarioQuery.createAdmin({ data: {
                traba: {
                    create: {
                        ci: '01101264403', 
                        nombre: 'Pablo',
                        apellido: 'Placeres',
                        telefono: '55713569',
                        foto: "",
                        descripcion: 'Esto es ua descripcion',
                        sexo: 'M'
                    }
                },
                user: {
                    create: {
                        usuario: 'Admin',
                        password: password,
                    }
                }
            }})
        }

    } catch (error) {
        console.log('%csrc/services/usuarios/controllers/usuarios.controllers.js:49 error', 'color: #007acc;', error);
    }
}