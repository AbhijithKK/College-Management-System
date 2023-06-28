const mongoose=require('mongoose')

let addsubject=mongoose.Schema({
department:{type:String,required:true},
subject:{type:String,required:true},
semester:{type:String,required:true}
})
let subject=mongoose.model('subject',addsubject)
module.exports={subject}