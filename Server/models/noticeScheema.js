const mongoose=require('mongoose')

let uploadNotice=mongoose.Schema({
name:{type:String,required:true},
filePath:{type:String,required:true}
})
let notice=mongoose.model('notice',uploadNotice)
module.exports={notice}