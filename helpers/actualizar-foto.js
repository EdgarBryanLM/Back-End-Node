const       Usuario                                  =require('../models/usuario');
const       Hospital                                 =require('../models/hospital');
const       Medico                                   =require('../models/medico');
const       fs                                       =require('fs');

const actualizarImagen=async (tipo,id,nombreArchivo)=>{

    switch (tipo) {
        case 'medicos':
            const medico=await Medico.findById(id);

            //No existe el medico
            if(!medico){return false;}

            const pathViejo=`./uploads/medicos/${medico.img}`;

            borrarImagen(pathViejo);

            medico.img=nombreArchivo;

            await medico.save();

            return true;
        break;
        case 'hospitales':
            const hospital=await Hospital.findById(id);

            //No existe el medico
            if(!hospital){return false;}

            const pathViejohospitales=`./uploads/hospitales/${hospital.img}`;

            borrarImagen(pathViejohospitales);

            hospital.img=nombreArchivo;

            await hospital.save();

            return true;
        break;
        case 'usuarios':
            const usuario=await Usuario.findById(id);

            //No existe el medico
            if(!usuario){return false;}

            const pathViejoUsuario=`./uploads/usuarios/${usuario.img}`;

            borrarImagen(pathViejoUsuario);

            usuario.img=nombreArchivo;

            await usuario.save();

            return true;
        break;

    }

};



const borrarImagen=(pathViejo)=>{

    if(fs.existsSync(pathViejo)){
    //borrar la imagen
        fs.unlinkSync(pathViejo);
    }
}

module.exports={
    actualizarImagen
}



/* var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads')); */