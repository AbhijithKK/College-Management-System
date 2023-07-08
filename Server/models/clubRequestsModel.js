const mongoose=require('mongoose')

let clubRequest=mongoose.Schema({
studentName:{type:String,required:true},
department:{type:String,required:true},
semester:{type:String,required:true},
clubName:{type:String,required:true},
status:{type:String,required:true},
clubAdminId:{type:String,required:true},
clubAdminName:{type:String,required:true},
studentId:{type:String,required:true},
clubId:{type:String,required:true},

})
let clubRequestScheema=mongoose.model('clubRequest',clubRequest)
module.exports={clubRequestScheema}