const mongoose=require('mongoose')

let adminScheema=mongoose.Schema({
email:{type:String,required:true},
password:{type:String,required:true},


})
let adminModel=mongoose.model('admin',adminScheema)
module.exports={adminModel}