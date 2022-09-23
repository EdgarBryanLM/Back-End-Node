const  {Router}                       =require('express');
const  {validarJWT}                    =require('../middlewares/validar-jwt');
const expresfileUpload = require('express-fileupload');

const {
    fileUpload,
    VerFoto
}= require('../controllers/uploads');

const router=Router();
router.use(expresfileUpload());

router.put( '/:tipo/:id',validarJWT,fileUpload); 
router.get( '/:tipo/:imagen',validarJWT,VerFoto); 


module.exports=router;