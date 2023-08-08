const { chatmessagemodel } = require("../models/ChatModels/ChatMessages");
const { chatModel } = require("../models/ChatModels/ChatModel");
const { facultyModel } = require("../models/facultyScheema");
const { studentModel } = require("../models/studentScheema");


let chats = {
    createChat: async (req, res) => {
        let senderId = req.body.id;
        let receiverIds = [];
    
        try {
            let senderData = await studentModel.findOne({ _id: req.body.id });
    
            if (senderData) {
                let faculty = await facultyModel.findOne({ adminOfClass: senderData.className });
    
                let chatExist = await chatModel.find({ members: { $all: [req.body.id, faculty?._id] } });
                console.log('existchat',chatExist);
                if (chatExist.length > 0) {
                    // Delete duplicate chats
                    await chatModel.deleteMany({ _id: { $in: chatExist.slice(1).map(chat => chat._id) } });
                   
                    return res.status(200).json(chatExist[0]);
                } else {
                   
                        chatExist=[]
                    
                    return res.status(200).json(chatExist);
                }
            } else {
                let facultyData = await facultyModel.findOne({ _id: req.body.id });
                let students = await studentModel.find({ className: facultyData?.adminOfClass });
    
                for (let i = 0; i < students.length; i++) {
                    receiverIds.push(students[i]._id);
                }
    
                const chatExist = await chatModel.find({ members: { $all: [req.body.id, ...receiverIds] } });
                if (chatExist.length > 0) {
                    // Delete duplicate chats
                    await chatModel.deleteMany({ _id: { $in: chatExist.slice(1).map(chat => chat._id) } });
                    return res.status(200).json(chatExist[0]);
                }
            }
    
            let newChat = new chatModel({
                members: [senderId, ...receiverIds]
            });
    
            const result = await newChat.save();
            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.json(false);
        }
    }
    ,
    
    userChats: async (req, res) => {
        try {
            let faculty=req.params.userId
            let student=await studentModel.findOne({_id:req.params.userId})
            if (student!=null) {
                let data=await facultyModel.findOne({adminOfClass:student.className})
                if (data!=null) {
                    
                    faculty=data._id
                }
            }
            const userId = faculty.toString()
            console.log(userId,'mjjjjj',req.params.userId);
            const chats = await chatModel.find({
                members: { $all: [userId] }
            });
    console.log('chats:',chats);
            // Fetch full documents for each chat based on _id
            const filteredChats = chats.filter(chat => chat.members.includes(userId));

        if (filteredChats.length > 0) {
            console.log(filteredChats);
            return res.status(200).json(filteredChats);
        } else {
            console.log('Nothing');
            return res.status(200).json([]);
        }
           
        } catch (err) {
            console.log(err);
            res.json(false);
        }
    },
    findChat: async (req, res) => {
        try {
            const chat = await chatModel.findOne({
                members: { $all: [req.params.fId, req.params.sId] }
            })
            res.status(200).json(chat)
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    // ================================MESSAGE=======================
    addMessage: async (req, res) => {
        console.log(req.body);
        const { chatId, senderId, text,name } = req.body
        const message = new chatmessagemodel({
            chatId,
            senderId,
            text,
            name
        })
        try {
            const result = await message.save()
            res.status(200).json(result)
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    getMessage: async (req, res) => {
        const { chatId } = req.params
        try {
            const result = await chatmessagemodel.find({
                chatId
            })
            res.status(200).json(result)
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    getUser: async (req, res) => {
        
        try {
            console.log(req.params.userId);
            id = req.params.userId
            let user = null
            if (id) {
                user = await studentModel.findOne({ _id: id })
               
            }
            if (user == null) {
                user = await facultyModel.findOne({ _id: id })
               
            }
          
            res.json(user)
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    }
}

module.exports = chats