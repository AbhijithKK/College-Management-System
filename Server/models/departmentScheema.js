const mongoose=require('mongoose')

let addDepartment=mongoose.Schema({
name:{type:String,required:true},

})
let department=mongoose.model('Department',addDepartment)
module.exports={department}