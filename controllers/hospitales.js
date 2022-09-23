const       {response, json}                         =require('express');
const       Hospital                                 =require('../models/hospital');

const getHospitales=async(req,res=response)=>{

    const usuarios=await Hospital.find().populate('usuario','nombre email');


    res.json({
        ok: true,
        usuarios: usuarios,
    });

}

const postHospital=async(req,res=response)=>{
    const id=req.idtoken;
    const hospital=new Hospital({
        usuario:id,
        ...req.body
    });

    try {
        
        const hospitalDB= await  hospital.save();

        res.json({
            ok:true,
            hospital:hospitalDB,
            msg:'Crear hospital'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        })
    }

}

const updateHospital=async (req,res=response)=>{
 //obtiene el id del link 
 const id=req.params.id;

 try {

     //Buscar Hospital en la base de datos
     const hospitalDB=Hospital.findById(id);

     

     //Si no existe el hospital 
     const campos=req.body;
     if(!hospitalDB){

         return res.status(404).json({
         ok:false,
         msg:"el hospital no existe"
         });
     }


     //actualizar
     const hospitalActualizado= await Hospital.findByIdAndUpdate(id,campos,{new:true});


     res.json({
         ok:true,
         id:id,
         usuario:hospitalActualizado,
         msg:"Hospital actualizado"
     });

     
 } catch (error) {
     console.log(error);
     res.status(500).json({
         ok:false,
         msg:'error interno'
     });
 }


}

const deleteHospital=async (req,res=response)=>{
    const id=req.params.id;


    try {
        //Buscar usuario en la base de datos
        const hospitalDB=Hospital.findById(id);

        

        //Si no existe el usuario 
        if(!hospitalDB){

            return res.status(404).json({
            ok:false,
            msg:"el hospital no existe"
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            id:id,
            msg:'Hospital borrado'
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
    getHospitales,
    postHospital,
    updateHospital,
    deleteHospital
};