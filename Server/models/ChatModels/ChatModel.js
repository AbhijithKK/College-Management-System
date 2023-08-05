const mongoose = require('mongoose')

let createChat = mongoose.Schema({
    members: { type: Array }
}, { timestamp: true })
const chatModel = mongoose.model('chat', createChat)
module.exports = { chatModel }