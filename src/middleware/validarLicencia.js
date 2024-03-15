import { request, response } from "express";

const validarLicencia = async (req = request, res = response, next)=>{
    const {licencia}=  req.body
    if (!licencia) {
        return res.status(401).json({msg: 'No hay licencia en la peticion'})} 
    try {
        const regexLicencia = /^C\d{6}$/;

        if (!regexLicencia.test(licencia)) {
            return res.status(400).json({msg: 'La licencia no es valida', licencia})}
            next()
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg: 'la licencia no es valida'})
    }
}

export default validarLicencia