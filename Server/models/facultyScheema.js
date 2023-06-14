const mongoose=require('mongoose')

const signup=mongoose.Schema({
    regNumber:{type:Number,default:0001},
    name:{type:String,required:true},
    DOB:{type:Date,required:true},
    gender:{type:String,required:true},
    department:{type:String,required:true},
    admYear:{type:String,required:true},
    address:{type:String,required:true},
    teachingArea:{type:String,required:true},
    qualifications:{type:String,required:true},
    mobNumber:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String}
})

const facultyModel=mongoose.model('faculty',signup)
module.exports={facultyModel}