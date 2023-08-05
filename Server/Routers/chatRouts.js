const express =require('express')
const { createChat, userChats, findChat, addMessage, getMessage } = require('../controllers/chatControllers')



let router=express.Router()
router.post('/',createChat)
router.get('/:userId',userChats)
router.get('/find/:fId/:sId',findChat)

// =================MESSSAG ROUTE=============================
router.post('/message',addMessage)
router.get('/message/:chatId',getMessage)
module.exports=router