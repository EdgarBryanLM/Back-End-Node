const       {response, json}                         =require('express');
const       Usuario                                  =require('../models/usuario');
const       Hospital                                 =require('../models/hospital');
const       Medico                                   =require('../models/medico');


const getTodo=async(req,res=response)=>{

    const busqueda=req.params.busqueda;

    
    const regex=new RegExp(busqueda,'i');

    const [usuarios,medicos,hospitales]= await Promise.all([
         Usuario.find({
            nombre:regex
          }),
         Medico.find({
            nombre:regex
          }),
         Hospital.find({
            nombre:regex
          })
    ]);                       

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });

};



const getTodoTabla=async(req,res=response)=>{

    const busqueda  =req.params.busqueda;
    const tabla     =req.params.tabla;
    const regex     =new RegExp(busqueda,'i');


    switch (tabla) {
        case 'usuarios':
    const usuarios=await Usuario.find({
                                 nombre:regex
                                });
              res.json({
                ok: true,
                tabla,
                data:usuarios,
                });

        break;

        case 'medicos':
                const medicos=await Medico.find({
                                 nombre:regex
                                });
              res.json({
                ok: true,
                tabla,
                data:medicos,
                });
        break;

        case 'hospitales':
                const hospitales=await Hospital.find({
                                 nombre:regex
                                });
              res.json({
                ok: true,
                tabla,
                data:hospitales,
                });
        break;
        default:
            res.status(400).json({
                ok: true,
                msg:'Tabla incorrecta'
            });
            break;
    }
                     
    
};

module.exports={
    getTodo,
    getTodoTabla
};