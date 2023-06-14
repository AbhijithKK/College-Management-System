const express=require('express')
let app=express()
const cors=require("cors")
const morgan=require("morgan")
const path=require("path")
const cookieParser=require('cookie-parser')
const admin=require('./Routers/adminRoutes')
const student=require('./Routers/studentRoutes')
const faculty=require('./Routers/facultyRouters')
const db=require('./config/config')
const bodyparser=require('body-parser')


app.use(bodyparser.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(cors({origin:'*'}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
db()
app.use('/admin',admin)
app.use('/student',student)
app.use('/faculty',faculty)







app.listen(4000,()=>{
    console.log("Server Started port:4000");
})