const       {response, json}                         =require('express');
const       { v4: uuidv4 }                           =require('uuid');
const       {actualizarImagen}                       =require('../helpers/actualizar-foto');
const       path                                     =require('path');
const       fs                                       =require('fs');


const fileUpload=async(req,res=response)=>{
    
    const tipo=req.params.tipo;
    const id  =req.params.id;

    try {
        const tiposValidos=['hospitales','medicos','usuarios'];

        //validar el tipo
        if(!tiposValidos.includes(tipo)){
            res.status(400).json({
                ok: false,
                msg:'El tipo es invalido'
            });
        
        }
    
        //validar si se mando un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
            ok:false,
            msg:'No se mando ningun archivo'
            });
          }
    
        //Procesar la imagen/archivo
        const file=req.files.imagen;
        const nombreCortado=file.name.split('.');
        const extencionNombre=nombreCortado[nombreCortado.length-1];

        //validar extencion
         const extensionesValidad=['png','jpg','jpeg','gif'];
        if(!extensionesValidad.includes(extencionNombre)){
          return  res.status(400).json({
                ok: false,
                msg:'No es una extención permitida'
            });
        } 
    
        //Nombre del archivo
        const nombreArchivo=`${uuidv4()}.${extencionNombre}`;

        //Path para generar el archivo
        const path=`./uploads/${tipo}/${nombreArchivo}`;

        // Mover la imagen
        file.mv(path, (err)=> {
            if (err){
                return res.status(500).json({
                ok:false,
                msg:err
                });
            }
            res.json({
                ok: true,
                msg:'se subio el archivo',
                nombreArchivo,
                path
            });
            
        });

        //Actualizar la base de datos
        actualizarImagen(tipo,id,nombreArchivo);
    
    } catch (error) {
        console.log(error);
    }

};



const VerFoto=(req,res=response)=>{
    const tipo=req.params.tipo;
    const imagen=req.params.imagen;

    const pathImg=path.join(__dirname,`../uploads/${tipo}/${imagen}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);

    }else{
        const pathImg=path.join(__dirname,`../uploads/no_imagen.jpg`);
        res.sendFile(pathImg);
    }


   

};


module.exports={
    fileUpload,
    VerFoto

};
