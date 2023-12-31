const mongoose = require('mongoose')

let addClub = mongoose.Schema({
    name: { type: String, required: true },
    discription: { type: String, required: true },
    clubAdmin: { type: String, required: true },
    clubAdminId: { type: String, required: true },
    meeting: [
        {
            id: { type: String },
            time: { type: String },
            place: { type: String },
            date: { type: String },
        }
    ],
})
let club = mongoose.model('clubs', addClub)
module.exports = { club }