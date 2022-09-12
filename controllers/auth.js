const       {response}                         =require('express');
const       Usuario                            =require('../models/usuario');
const       bcryp                              =require('bcryptjs');
const       {GenerarJWT}                       =require('../helpers/jwt')




const login=async(req,res)=>{
    const {email,password}=req.body;

    try {
        //Verificar email
        const usuarioDB=await Usuario.findOne({email});

        if(!usuarioDB){
            res.status(404).json({
                ok:false,
                msg:'Usuario o contraseña invallidas'
              
            });
        }


        //Validar password

        const validarPassword=bcryp.compareSync(password,usuarioDB.password);
        if(!validarPassword){
            res.status(404).json({
                ok:false,
                msg:'Usuario o contraseña invallidas'
              
            });
        }


        //Generar JWT

        const token=await GenerarJWT(usuarioDB.id);


        res.status(200).json({
            ok:true,
            token
          
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg:'Error interno'
        });
    }

}


module.exports={
    login
}