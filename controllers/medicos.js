const       {response}                         =require('express');
const         Medico                           =require('../models/medico');



const getMedicos=async(req,res=response)=>{
    const medicos=await Medico.find().populate('usuario','nombre').
                                      populate('hospital','nombre');


    res.json({
        ok: true,
        data: medicos,
    });


}

const postMedicos= async(req,res=response)=>{

    const id=req.idtoken;
    const medico=new Medico({
        usuario:id,
        ...req.body
    });

    try {
        console.log(medico);
        const medicoDB= await  medico.save();

        res.json({
            ok:true,
            hospital:medicoDB,
            msg:'Medico creado de forma exitosa'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        })
    }


}

const updateMedicos=async (req,res=response)=>{
    const id=req.params.id;

    try {
   
        //Buscar medico en la base de datos
        const medicoDB=Medico.findById(id);
   
        
   
        //Si no existe el hospital 
        const campos=req.body;
        if(!medicoDB){
   
            return res.status(404).json({
            ok:false,
            msg:"el hospital no existe"
            });
        }
   
   
        //actualizar
        const hospitalActualizado= await Medico.findByIdAndUpdate(id,campos,{new:true});
   
   
        res.json({
            ok:true,
            id:id,
            usuario:hospitalActualizado,
            msg:"Medico actualizado"
        });
   
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error interno'
        });
    }
   


}

const deleteMedicos=async(req,res=response)=>{
    const id=req.params.id;


    try {
        //Buscar medico en la base de datos
        const medicoDB=Medico.findById(id);

        

        //Si no existe el medico 
        if(!medicoDB){

            return res.status(404).json({
            ok:false,
            msg:"el medico no existe"
            });
        }

        await Medico.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            id:id,
            msg:'medico borrado'
        });
        
    } catch (error) {
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'Error interno'
        });
    }


}

module.exports={
    getMedicos,
    postMedicos,
    updateMedicos,
    deleteMedicos
};