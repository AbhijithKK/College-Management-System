const mongoose=require('mongoose')

const message=mongoose.Schema({
    senderId:{type:String},
    receiverId:{type:String}
},{
    timestamp:true
})
const chatmessagemodel=mongoose.model('chatMessages',message)
module.exports={chatmessagemodel}