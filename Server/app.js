const express = require('express')
let app = express()
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const cookieParser = require('cookie-parser')
const admin = require('./Routers/adminRoutes')
const student = require('./Routers/studentRoutes')
const faculty = require('./Routers/facultyRouters')
const chat = require('./Routers/chatRouts')
const db = require('./config/config')
const bodyparser = require('body-parser')
const sanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
require('dotenv')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors({ origin: [process.env.BASE_URL], credentials: true }))
app.use(morgan("dev"))
app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(sanitize())
app.use(xss())

db()
app.use('/admin', admin)
app.use('/student', student)
app.use('/faculty', faculty)
app.use('/chat', chat)







app.listen(4000, () => {
    console.log("Server Started port:4000");
})