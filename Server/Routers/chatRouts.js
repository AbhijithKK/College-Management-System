const express = require('express')
const { createChat, userChats, findChat, addMessage, getMessage, getUser } = require('../controllers/chatControllers')
const { chatAuth } = require('../middlewere/chatMiddlewere')



let router = express.Router()
router.post('/',chatAuth, createChat)
router.get('/:userId',chatAuth, userChats)
router.get('/find/:fId/:sId',chatAuth, findChat)

// =================MESSSAG ROUTE=============================
router.post('/message',chatAuth, addMessage)
router.get('/message/:chatId',chatAuth, getMessage)

// ===================USER====================================
router.get('/user/:userId',chatAuth, getUser)
module.exports = router