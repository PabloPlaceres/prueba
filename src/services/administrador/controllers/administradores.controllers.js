import { PrismaClient } from "@prisma/client";
import { request, response } from "express";
import bcryptjs from "bcryptjs";
import usuarioQuery from "../../usuarios/query/usuario.query.js"
import queryAdmin from "../query/administrador.query.js"
import trabajadorQuery from "../../trabajador/query/trabajador.query.js"

const prisma = new PrismaClient()

export const crearAdmin = async (req = request, res = response)=>{
try {
    const {ci, telefono, nombre, apellido, foto, descripcion,sexo, usuario} = req.body
    
    const existeCI = await trabajadorQuery.trabajadorExistente(ci)
    const existeUsuario = await usuarioQuery.usuarioExistente(usuario)
    
    console.log(existeCI, existeUsuario)

    if ( !existeCI && !existeUsuario) {
        const salt = bcryptjs.genSaltSync()
        const password = bcryptjs.hashSync(req.body.password, salt)
    
        const result = await queryAdmin.crearAdministradorQuery({ci, telefono, nombre, apellido, foto, descripcion,sexo}, {usuario, password})
        return res.status(200).json({result})
    }
    if (existeUsuario) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    } else {
        return res.status(400).json({ error: 'El ci ya está en uso' });
    }
} catch (error) {
    console.log(error)
    return res.status(500).json(error)
}
}

export const updateAdministrador = async(req= request, res=response)=>{
try {
    const id = req.params.id
    const x = parseInt(id)
    const {ci, telefono, nombre, apellido, foto, descripcion,sexo, usuario} = req.body
    
    const existeCI = await trabajadorQuery.trabajadorExistente(ci)
    const existeUsuario = await usuarioQuery.usuarioExistente(usuario)
    
    console.log(existeCI, existeUsuario)

    if ( !existeCI && !existeUsuario) {
        const salt = bcryptjs.genSaltSync()
        const password = bcryptjs.hashSync(req.body.password, salt)
    
        const result = await queryAdmin.updateAdministradorQuery({ci, telefono, nombre, apellido, foto, descripcion, sexo}, {usuario, password}, x)
        return res.status(200).json({result})
    }
    if (existeUsuario) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    } else {
        return res.status(400).json({ error: 'El ci ya está en uso' });
    }
} catch (error) {
    console.log(error)
    return res.status(500).json(error)
}
}

export const listarAdmin =async (req= request, res=response)=>{
    try {
        const result = await queryAdmin.listarAdministradorQuery()
        return res.status(200).json({result})  
    } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    }
}

export const eliminarAdmin = async(req= request, res=response)=>{
    try {
        const id = req.params.id
        const x = parseInt(id)

        const Admin = await queryAdmin.obtenerAdministradorQuery(x);
        if (!Admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const [result] = [(await trabajadorQuery.eliminarTrabajadorAdministradorQuery(x)), 
                        (await usuarioQuery.eliminarUsuarioAdministradorQuery(x)),
                        (await queryAdmin.eliminarAdministradorQuery(x))]
        res.status(200).json({result})
    } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    }
}


export const invetario = async (res = response, req = request)=>{
    try {
        const result = await queryAdmin.invetarioQuery()
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
