const express=require('express')
const student = require('../controllers/studentControllers')
const router=express.Router()

router.get('/',student.studentLogin)


module.exports=router