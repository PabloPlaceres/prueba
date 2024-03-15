import { PrismaClient } from "@prisma/client";
import { request, response } from "express";
import bcryptjs from "bcryptjs";
import usuarioQuery from "../../usuarios/query/usuario.query.js"
import queryRepa from "../query/repartidor.query.js"
import trabajadorQuery from "../../trabajador/query/trabajador.query.js"
import paqueteQuery from "../../paquete/query/paquete.query.js";

const prisma = new PrismaClient()

export const crearRepa = async (req = request, res = response)=>{
try {
    const {licencia, ci, telefono, nombre, apellido, foto, descripcion,sexo, usuario} = req.body
    
    const existeCI = await trabajadorQuery.trabajadorExistente(ci)
    const existeUsuario = await usuarioQuery.usuarioExistente(usuario)
    const existeLicencia = await queryRepa.existeLicenciaQuery(licencia)
    
    

    if ( !existeCI && !existeUsuario && !existeLicencia) {
        const salt = bcryptjs.genSaltSync()
        const password = bcryptjs.hashSync(req.body.password, salt)
    
        const result = await queryRepa.crearRepartidorQuery(licencia, {ci, telefono, nombre, apellido, foto, descripcion,sexo}, {usuario, password})
        return res.status(200).json({result})
    }
    if (existeUsuario) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    } else if (existeCI) {
        return res.status(400).json({ error: 'El ci ya está en uso' })
    } else {
        return res.status(400).json({error: 'La licencia ya existe'})  
    } 
} catch (error) {
    console.log(error)
    return res.status(500).json(error)
}
}

export const updateRepa = async(req= request, res=response)=>{
try {
    const id = req.params.id
    const x = parseInt(id)
    const {licencia, ci, telefono, nombre, apellido, foto, descripcion, sexo, usuario} = req.body
    
    const existeCI = await trabajadorQuery.trabajadorExistente(ci)
    const existeUsuario = await usuarioQuery.usuarioExistente(usuario)
    
    console.log(existeCI, existeUsuario)

    if ( !existeCI && !existeUsuario) {
        const salt = bcryptjs.genSaltSync()
        const password = bcryptjs.hashSync(req.body.password, salt)
    
        const result = await queryRepa.updateAdministradorQuery(licencia,{ci, telefono, nombre, apellido, foto, descripcion, sexo}, {usuario, password}, x)
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

export const listarRepa =async (req= request, res=response)=>{
    try {
        const result = await queryRepa.listarRepartidorQuery()
        return res.status(200).json({result})  
    } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    }
}

export const eliminarRepa = async(req= request, res=response)=>{
    try {
        const id = req.params.id
        const x = parseInt(id)

        const repa = await queryRepa.obtenerRepartidorQuery(x);
        if (!repa) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        const [result] = [(await trabajadorQuery.eliminarTrabajadorRepartidorQuery(x)), 
                        (await usuarioQuery.eliminarUsuarioRepartidorQuery(x)),
                        (await queryRepa.eliminarRepartidorQuery(x))]
        res.status(200).json({result})
    } catch (error) {
    console.log(error)
    return res.status(500).json(error)
    }
}

export const entregarPaquete = async (req = request, res= response)=>{
        const id = req.params.id
        const x = parseInt(id)

        const {idT} = req.header('x-Token')
        const z = parseInt(idT)

        const paqueteExist = await paqueteQuery.obtenerPaqueteQuery(x)
        if(!paqueteExist){return res.status(400).json({error: 'Paquete not found'})}

        const result = await paqueteQuery.entregarPaqueteQuery(x, z)
        return result
}

export const ponerPaqueteComboReparitidor = async (req = request, res= response)=>{
    const id = req.params.id
    const x = parseInt(id)

    const {idT} = req.header('x-Token')
    const z = parseInt(idT)

    const paqueteExist = await paqueteQuery.obtenerPaqueteQuery(x)
    if(!paqueteExist){return res.status(400).json({error: 'Paquete not found'})}

    const result = await paqueteQuery.ponerPaqueteComboReparitidorQuery(x, z)
    return result
}