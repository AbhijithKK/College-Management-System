const mongoose=require('mongoose')

let CreatePayment=mongoose.Schema({
paymentId:{type:mongoose.Schema.Types.ObjectId,ref:'payments'},
studentId:{type:mongoose.Schema.Types.ObjectId,ref:'students'},
status:{type:String,default:'process'}
})
let paymentHistoryModel=mongoose.model('paymentHistory',CreatePayment)
module.exports={paymentHistoryModel}