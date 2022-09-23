const       {response}                         =require('express');
const       Usuario                            =require('../models/usuario');
const       bcryp                              =require('bcryptjs');
const       {GenerarJWT}                       =require('../helpers/jwt')
const       {googleVerify}                       =require('../helpers/verificar-google')




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

};


const logingoogle=async(req,res=response)=>{

   

    try {
        const user= await googleVerify(req.body.token);
        const email=user.email;
        const nombre=user.name;
        const picture=user.picture;
        const UserDb=await Usuario.findOne({email});
        let   usuario;
        if (!UserDb) {
            usuario=Usuario({
            nombre,
            email,
            password:'@@@',
            img:picture,
            google:true
            });
        }else{
            usuario=usuarioDB;
            usuario.google=true;
        }

        //Guardar usuario
        await usuario.save();

        //Generar JWT

        const token=await GenerarJWT(usuario.id);

        console.log('hi');
        console.log(user);
        res.status(200).json({
            ok:true,
            user,
            token
          
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:req.body.token,
            error
        });
    }


}


module.exports={
    login,
    logingoogle
}