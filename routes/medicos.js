/* Ruta:api/usuarios */

const  {Router}                       =require('express');
const  {check}                        =require('express-validator')
const {validarCampos}                 =require('../middlewares/validar-campos')
const {validarJWT}                    =require('../middlewares/validar-jwt');
const {
    getMedicos,
    postMedicos,
    updateMedicos,
    deleteMedicos
}= require('../controllers/medicos');

const router=Router();

router.get( '/',validarJWT,getMedicos); 
router.post( '/',[
    validarJWT,
    check('nombre','el nombre del hospital es necesario').not().isEmpty(),
    check('hospital','el hospital es necesario').isMongoId(),
    validarCampos
],postMedicos);
router.put( '/:id',[
    validarJWT,
    check('nombre','el nombre del hospital es necesario').not().isEmpty(),
    check('hospital','el hospital es necesario').isMongoId(),
    validarCampos
],updateMedicos); 
router.delete( '/:id',[],deleteMedicos); 

module.exports=router;