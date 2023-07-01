const mongoose=require('mongoose')

const signup=mongoose.Schema({
    regNumber:{type:Number,default:0001},
    name:{type:String,required:true},
    DOB:{type:Date,required:true},
    gender:{type:String,required:true},
    department:{type:String,required:true},
    admYear:{type:String,required:true},
    address:{type:String,required:true},
    guardianNo:{type:String,required:true},
    semester:{type:String,required:true},
    mobNumber:{type:String,required:true},
    guardianName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String}
})

const studentModel=mongoose.model('student',signup)
module.exports={studentModel}