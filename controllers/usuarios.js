const       Usuario                            =require('../models/usuario');
const       {response}                         =require('express');
const       bcryp                              =require('bcryptjs');
const       {GenerarJWT}                       =require('../helpers/jwt')


const getUsuarios=async (req, res) => {

    const desde=Number(req.query.desde) || 0;

    const [usuarios,total]=await Promise.all([
        Usuario.find({},"nombre email rol google img")
                .skip(desde)
                .limit(2),
        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios: usuarios,
        total
    });

}

const postUsuarios=async (req, res=response) => {

    const{email,password,nombre}=req.body;



try {

    const existeEmail=await Usuario.findOne({email});

    if(existeEmail){
    return res.status(400).json({
        ok:false,
        msg:"El correo ya existe"
    });
    }

    const usuario= new Usuario(req.body);

    //Encriptar contraseña
    const salt=bcryp.genSaltSync();
    usuario.password=bcryp.hashSync(password,salt)

    //Guardar en base de datos
    await usuario.save();

    //Generar JWT

    const token=await GenerarJWT(usuario.id);

    //retornar respuesta
    res.json({
        ok: true,
        msg:"Usuario creado",
        usuario,
        token
    });
    
} catch (error) {
    console.log(error);
    res.status(500).json({
    ok:false,
    msg:'Error insesperado'
    });
    
}

}


const putUsuario =async(req,res=response)=>{
    //obtiene el id del link 
    const id=req.params.id;

    try {

        //Buscar usuario en la base de datos
        const usuarioDB=Usuario.findById(id);

        

        //Si no existe el usuario 
        if(!usuarioDB){

            return res.status(404).json({
            ok:false,
            msg:"el usuario no existe"
            });
        }


        //actualizar

        const campos=req.body;
        if(usuarioDB===req.body.email){
        delete campos.email;
        }else{
            const existeEmail=await Usuario.findOne({email:req.body.email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:"El correo ya existe"
                });
            }
        }


        delete campos.password;
        delete campos.google;

        const usuarioActualizado= await Usuario.findByIdAndUpdate(id,campos,{new:true});


        res.json({
            ok:true,
            id:id,
            usuario:usuarioActualizado,
            msg:"Usuario actualizado"
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error interno'
        });
    }

};


const deleteUsuaruio=async (req, res=response) => {
    const id=req.params.id;


    try {
        //Buscar usuario en la base de datos
        const usuarioDB=Usuario.findById(id);

        

        //Si no existe el usuario 
        if(!usuarioDB){

            return res.status(404).json({
            ok:false,
            msg:"el usuario no existe"
            });
        }

        await Usuario.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            id:id,
            msg:'Usuario borrado'
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
    getUsuarios,
    postUsuarios,
    putUsuario,
    deleteUsuaruio
}