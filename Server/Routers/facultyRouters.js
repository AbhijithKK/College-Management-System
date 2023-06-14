const express=require('express')
const faculty = require('../controllers/facultyControllers')
const router=express.Router()

router.get('/',faculty.facultyLogin)


module.exports=router
