
const { type } = require('express-cookie/lib/response')
const mongoose=require('mongoose')

let addAttendance=new mongoose.Schema({
    date:{type:String,required:true},
    className:{type:String,required:true},
    student: {
        type: [{
          facultyId: { type: mongoose.Schema.Types.ObjectId },
          facultyName: { type: String },
          studentId: { type: mongoose.Schema.Types.ObjectId },
          studentName: { type: String },
          status: { type: String },
          department: { type: String },
          date: { type: String }
        }],
        required: true,
        
      },
    

})
let attendenceScheema=mongoose.model('attendence',addAttendance)
module.exports={attendenceScheema}