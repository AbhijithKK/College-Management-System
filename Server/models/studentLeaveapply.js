const mongoose=require('mongoose')

let leaveLetter=mongoose.Schema({
    studentName:{type:String,required:true},
    department:{type:String,required:true},
    semester:{type:String,required:true},
    className:{type:String,required:true},
    studentId:{type:String,required:true},
    reson:{type:String,required:true},
    date:{type:String,required:true},
    status:{type:String,default:''},
})
let leaveApplyScheema=mongoose.model('leaveLetters',leaveLetter)
module.exports={leaveApplyScheema}