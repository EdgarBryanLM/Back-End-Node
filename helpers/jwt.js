const jwt=require('jsonwebtoken');

const GenerarJWT=(id)=>{


    return new Promise((resolve,reject) => {
        const payload={
            id
        }
    
    
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'12h'
        },(err,token)=>{
            if(err){
            console.log(err);
            reject('Error')
            }

            resolve(token);
        });
    });

}





module.exports={
    GenerarJWT
}