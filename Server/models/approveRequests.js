const mongoose=require('mongoose')

const Approve=mongoose.Schema({
    
    id:{type:String,default:false},
    name:{type:String,default:false},
    email:{type:String,default:false},
    mobNumber:{type:String,default:false},
    DOB:{type:Date,String,default:false},
    gender:{type:String,default:false},
    admYear:{type:String,default:false},
    department:{type:String,default:false},
    semester:{type:String,default:false},
    address:{type:String,default:false},
    regNumber:{type:Number,default:false},
    guardianNo:{type:String,default:false},
    guardianName:{type:String,default:false,},
    className:{type:String,default:false},
    qualifications:{type:String,default:false},
    teachingArea:{type:String,default:false},
    image:{type:String ,default:false},
    category:{type:String ,default:false},
    date:{type:String ,default:false},
})

const approveModel=mongoose.model('approveRequests',Approve)
module.exports={approveModel}