const mongoose=require('mongoose')

let addcomplaint=mongoose.Schema({
title:{type:String,required:true},
content:{type:String,required:true},
name:{type:String,required:true},
date:{type:String,required:true},
who:{type:String,required:true},
complainterId:{type:String,required:true},
department:{type:String,required:true},
className:{type:String},
semester:{type:String},
teachingArea:{type:String},


})
let complaintScheema=mongoose.model('complaint',addcomplaint)
module.exports={complaintScheema}