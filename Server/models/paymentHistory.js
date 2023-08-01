const mongoose=require('mongoose')

let CreatePayment=mongoose.Schema({
paymentId:{type:mongoose.Schema.Types.ObjectId,ref:'payment'},
studentId:{type:mongoose.Schema.Types.ObjectId,ref:'student'},
status:{type:String,default:'process'},
payDate:{type:String,}
})
let paymentHistoryModel=mongoose.model('paymentHistory',CreatePayment)
module.exports={paymentHistoryModel}