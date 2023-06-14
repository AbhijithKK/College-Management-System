const mongoose=require('mongoose')

let addSemester=mongoose.Schema({
department:{type:String,required:true},
semester:{type:String,required:true}
})
let semester=mongoose.model('semester',addSemester)
module.exports={semester}