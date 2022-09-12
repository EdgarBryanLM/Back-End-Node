/* Ruta:api/usuarios */

const  {Router}                       =require('express');
const  {getUsuarios,postUsuarios,putUsuario,deleteUsuaruio}     =require('../controllers/usuarios')
const  {check}                        =require('express-validator')

const {validarCampos}=require('../middlewares/validar-campos')
const {validarJWT}=require('../middlewares/validar-jwt')

const router=Router();

router.get( '/',validarJWT,getUsuarios); 
router.post( '/',[
    validarJWT,
    check('nombre',  'nombre obligatorio').not().isEmpty(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    check('email',   'el email es obligatorio y en formato de correo').isEmail(),
    validarCampos
],postUsuarios);

router.put( '/:id',[
    validarJWT,
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    check('email',  'el email es obligatorio y en formato de correo').isEmail(),
    check('role',    'el role es obligatorio').isEmail(),
    validarCampos

],putUsuario); 

router.delete( '/:id',[


],validarJWT,deleteUsuaruio); 

module.exports=router;