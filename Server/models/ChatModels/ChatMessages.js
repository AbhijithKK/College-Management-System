const mongoose=require('mongoose')

const message=mongoose.Schema({
    chatId:{type:String},
    senderId:{type:String},
    text:{type:String},
},{
    timestamps:true
})
const chatmessagemodel=mongoose.model('chatMessages',message)
module.exports={chatmessagemodel}