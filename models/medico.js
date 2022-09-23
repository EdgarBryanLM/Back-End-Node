const {Schema,model}=require('mongoose');


const MedicosSchema=Schema({
    nombre:{
        type:String,
        require:true
    },
    img:{
        type:String
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    hospital:{
        type:Schema.Types.ObjectId,
        ref:'Hospital',
        required:true
    }

},{colletion:'Medicos'});

MedicosSchema.method('toJSON', function(){

   const{_v,...object}= this.toObject();
   return object

});

module.exports=model('Medico',MedicosSchema);