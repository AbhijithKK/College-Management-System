const express =require('express')
const { createChat, userChats, findChat, addMessage, getMessage, getUser } = require('../controllers/chatControllers')



let router=express.Router()
router.post('/',createChat)
router.get('/:userId',userChats)
router.get('/find/:fId/:sId',findChat)

// =================MESSSAG ROUTE=============================
router.post('/message',addMessage)
router.get('/message/:chatId',getMessage)

// ===================USER====================================
router.get('/user/:userId',getUser)
module.exports=router