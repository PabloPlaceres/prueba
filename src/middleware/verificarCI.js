import { request, response } from "express";

const validarCIcubano = async(req = request, res = response, next)=> {
    const {ci, sexo}=  req.body
    if (!ci || !sexo) {
        return res.status(401).json({
            msg: 'No hay ni ci, sexo en la peticion'
        })
    }    
    try {
        if (ci.length !==  11) {
            return res.status(400).json({msg : 'El ci debe tener 11 caracteres'});
        }
        
        var ano = parseInt(ci.substring(0,  2),  10);
        var mes = parseInt(ci.substring(2,  4),  10);
        var dia = parseInt(ci.substring(4,  6),  10);
        var siglo = parseInt(ci.substring(6,  7),  10);
        var final = parseInt(ci.substring(9, 11),  10);
        
        const maxDaysInMonth = {
            1: 31, 3: 31, 4: 30, 5: 31, 6: 30,
            7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
        };
        console.log(ano, mes, dia, siglo, final)
        
        if (!(dia >=  1 && dia <=  31) || !(mes >=  1 && mes <=  12) || !(ano >= 0 && ano <=  99)) {
            return res.status(400).json({msg: 'Dia debe estar entre 1 y 31, mes debe estar dentro de 1 y 12, y ano entre 0 y 99', dia,mes, ano});
        }

        if (mes === 2  ) {if (!(dia <=28 && (dia <= 29 && (ano % 4 === 0))))
            {return res.status(400).json({msg: 'Si el mes es 2 de ser entre 1 y 28 al no ser que sea ano bisiestro que puede ser 29', ano, dia, mes})}}
        
        if (dia > maxDaysInMonth[mes]) {
        return res.status(400).json({ msg: `Para el mes ${mes}, el día debe ser menor a ${maxDaysInMonth[mes]}`, dia, mes });
        }

        if(!((ano>24 && siglo<5)||(ano<24& siglo>=5))){
            return res.status(400).json({meg: 'El valor del ano tiene que compaginar con el siglo, si naciste en siglo 21 debe poseer un siglo mayor a 5 y si naciste en el siglo 20 vas a tener un numero menor 6', siglo, ano})
        }
        
        if (!((sexo === "M")&&(final %  2 !==  0))||((sexo === "F")&&(final %  2 ===  0))) {
            return res.status(400).json({msq: 'Si su sexo es M el final debe ser impar y si eres F el final es par', sexo, final})
        } 
        next()
        } catch (error) {
            console.log(error)
        return res.status(401).json({
            msg: 'El ci no es valido'
        })
        }
    }

export default validarCIcubano