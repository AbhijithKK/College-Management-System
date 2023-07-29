const mongoose=require('mongoose')

let CreatePayment=mongoose.Schema({
title:{type:String,required:true},
amount:{type:String,required:true},
date:{type:String,required:true},
})
let paymentModel=mongoose.model('payment',CreatePayment)
module.exports={paymentModel}