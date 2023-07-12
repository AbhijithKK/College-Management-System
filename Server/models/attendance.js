
const { type } = require('express-cookie/lib/response')
const mongoose=require('mongoose')

let addAttendance=new mongoose.Schema({
    
  date: {type:String,required:true},
  studentName: {type:String,required:true},
  studentId: {type:String,required:true},
  facultyName: {type:String,required:true},
  facultyId: {type:String,required:true},
  className: {type:String,required:true},
  department: {type:String,required:true},
  status: {type:String,required:true}
    

})
let attendenceScheema=mongoose.model('attendence',addAttendance)
module.exports={attendenceScheema}