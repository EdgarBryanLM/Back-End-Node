/* Ruta:api/usuarios */

const  {Router}                       =require('express');
const  {check}                        =require('express-validator')
const {validarCampos}                 =require('../middlewares/validar-campos')
const {validarJWT}                    =require('../middlewares/validar-jwt');
const {
    getHospitales,
    postHospital,
    updateHospital,
    deleteHospital
}= require('../controllers/hospitales');

const router=Router();

router.get( '/',validarJWT,getHospitales); 
router.post( '/',[
    validarJWT,
    check('nombre','el nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],postHospital);
router.put( '/:id',[
    check('nombre','el nombre del hospital es necesario').not().isEmpty(),
    validarCampos
],updateHospital); 
router.delete( '/:id',[],deleteHospital); 

module.exports=router;