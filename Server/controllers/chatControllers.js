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
        let faculty = await facultyModel.findOne({
          adminOfClass: senderData?.className,
        });

        let chatExist = await chatModel.find({
          members: { $all: [req.body.id, faculty?._id] },
        });

        if (chatExist.length > 0) {
          // Delete duplicate chats
          await chatModel.deleteMany({
            _id: { $in: chatExist.slice(1).map((chat) => chat._id) },
          });

          return res.status(200).json(chatExist[0]);
        } else {
          chatExist = [];

          return res.status(200).json(chatExist);
        }
      } else {
        let facultyData = await facultyModel.findOne({ _id: req.body.id });
        let students = await studentModel.find({ className: facultyData?.adminOfClass });
  
        if (facultyData) {
            console.log('enterd to facultyyy');
            let ff=facultyData._id.toString()
            console.log(ff);
            let chats=await chatModel.findOne({members:{$all:[ff]}})
            
            if (chats) {
               
                for (let i = 0; i < students.length; i++) {
                    console.log(students[i]._id);
                  receiverIds.push(students[i]._id);
                }
                const updateChat = await chatModel.updateOne(
                    { members: { $nin: [req.body.id] } }, // Ensure req.body.id is not already in members array
                    { $push: { members: { $each: [req.body.id, ...receiverIds], $position: 0 } } }
                  );
                  
                                  console.log(updateChat);
                return res.status(200).json(updateChat);

            }else{
                for (let i = 0; i < students.length; i++) {
                    console.log(students[i]._id);
                  receiverIds.push(students[i]._id);
                }
        
            }            
        }
        
      }

      let newChat = new chatModel({
        members: [senderId, ...receiverIds],
      });

      const result = await newChat.save();
      return res.status(200).json(result);
    } catch (err) {
        console.log(err);
      return res.json(false);
    }
  },
  userChats: async (req, res) => {
    try {
      let faculty = req.params.userId;
      let student = await studentModel.findOne({ _id: req.params.userId });
      if (student != null) {
        let data = await facultyModel.findOne({
          adminOfClass: student.className,
        });
        if (data != null) {
          faculty = data._id;
        }
      }
      const userId = faculty.toString();

      const chats = await chatModel.find({
        members: { $all: [userId] },
      });
      for (let i = 1; i < chats.length; i++) {
        await chatModel.findByIdAndDelete(chats[i]._id);
      }
      
      // Fetch full documents for each chat based on _id
      const filteredChats = chats.filter((chat) =>
        chat.members.includes(userId)
      );

      if (filteredChats.length > 0) {
        return res.status(200).json(filteredChats);
      } else {
        return res.status(200).json([]);
      }
    } catch (err) {
      res.json(false);
    }
  },
  findChat: async (req, res) => {
    try {
      const chat = await chatModel.findOne({
        members: { $all: [req.params.fId, req.params.sId] },
      });
      res.status(200).json(chat);
    } catch (err) {
      res.json(false);
    }
  },
  // ================================MESSAGE=======================
  addMessage: async (req, res) => {
    const { chatId, senderId, text, name } = req.body;
    const message = new chatmessagemodel({
      chatId,
      senderId,
      text,
      name,
    });
    try {
      const result = await message.save();
      res.status(200).json(result);
    } catch (err) {
      res.json(false);
    }
  },
  getMessage: async (req, res) => {
    const { chatId } = req.params;
    try {
      const result = await chatmessagemodel.find({
        chatId,
      });
      res.status(200).json(result);
    } catch (err) {
      res.json(false);
    }
  },
  getUser: async (req, res) => {
    try {
      id = req.params.userId;
      let user = null;
      if (id) {
        user = await studentModel.findOne({ _id: id });
      }
      if (user == null) {
        user = await facultyModel.findOne({ _id: id });
      }

      res.json(user);
    } catch (err) {
      res.json(false);
    }
  },
};

module.exports = chats;
