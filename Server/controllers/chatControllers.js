const { chatmessagemodel } = require("../models/ChatModels/ChatMessages");
const { chatModel } = require("../models/ChatModels/ChatModel")

let chats = {
    createChat: async (req, res) => {
        console.log(req.body,'ll');
        const newChat = new chatModel({
            members: [req.body.senderId, req.body.receiverId]
        })
        try {
            const result = await newChat.save()
            res.status(200).json(result)
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    userChats: async (req, res) => {
       try{
        const chat=await chatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat)
       }catch(err){
        console.log(err);
        res.json(false)
       }
    },
    findChat: async (req, res) => {
        try{
            const chat=await chatModel.findOne({
                members:{$all:[req.params.fId,req.params.sId]}
            })
            res.status(200).json(chat)
        }catch(err){
            console.log(err);
            res.json(false)
           }
    },
    // ================================MESSAGE=======================
    addMessage:async(req,res)=>{
        const {chatId,senderId,text}=req.body
        const message=new chatmessagemodel({
            chatId,
            senderId,
            text
        })
        try{
            const result=await message.save()
            res.status(200).json(result)
        }catch(err){
            console.log(err);
            res.json(false)
        }
    },
    getMessage:async(req,res)=>{
        const {chatId}=req.params
        try{
            const result=await chatmessagemodel.find({
                chatId
            })
            res.status(200).json(result)
        }catch(err){
            console.log(err);
            res.json(false)
        }
    }
}

module.exports = chats