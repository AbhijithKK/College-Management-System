const mongoose=require('mongoose')

let addClass=mongoose.Schema({
className:{type:String,required:true},
department:{type:String,required:true},

})
let classScheema=mongoose.model('class',addClass)
module.exports={classScheema}