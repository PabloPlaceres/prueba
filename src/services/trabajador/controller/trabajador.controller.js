import { request, response } from "express";
import trabajadorQuery from "../query/trabajador.query.js";


export const crearTrabajador = async(req = request, res = response)=>{
try {
    const {ci, telefono, nombre, apellido, foto, descripcion, sexo} = req.body
    const existeCI = await trabajadorQuery.trabajadorExistente(ci)
    if (existeCI) {
        return res.status(400).json({ error: 'El ci ya está en uso' });
    }

    const result = await trabajadorQuery.CrearTrabajadorQuery({ci, telefono, nombre, apellido, foto, descripcion, sexo})
    res.status(200).json({result})
} catch (error) {
    console.log(error)
    return res.status(500).json(error)
}
}

export const actualizarTrabajador = async(req = request, res = response)=>{
    try {
        const { telefono, nombre, apellido, foto, descripcion, sexo} = req.body
        const {ci} = req.params
        
        const existeCI = await trabajadorQuery.trabajadorExistente(ci)
        if (!existeCI) {
            return res.status(400).json({ error: 'El ci no existe' });
        }

        const result = await trabajadorQuery.actualizarTrabajadorQuery({ telefono, nombre, apellido, foto, descripcion, sexo}, ci)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
    }


export const eliminartrabajador = async (req = request, res = response)=>{
    try {
        const {ci} = req.params
        const existeCI = await trabajadorQuery.trabajadorExistente(ci)
        if (!existeCI) {
            return res.status(400).json({ error: 'El ci no existe' });
        }
        const result = await trabajadorQuery.deleteTrabajadorQuery(ci)
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const listarTrabajador = async (req= request, res= response)=>{
    try {
        const result = await trabajadorQuery.listarTrabajadorQuery()
        res.status(200).json({result})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}