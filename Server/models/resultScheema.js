const mongoose=require('mongoose')

let addMark=mongoose.Schema({
department:{type:String,required:true},
semester:{type:String,required:true},
className:{type:String,required:true},
studentName:{type:String,},
mark:{type:String,required:true},
grade:{type:String,required:true},
studentId:{type:String,required:true},

})
let resultScheema=mongoose.model('result',addMark)
module.exports={resultScheema}