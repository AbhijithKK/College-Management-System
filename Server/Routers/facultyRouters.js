const express=require('express')
const faculty = require('../controllers/facultyControllers')
const router=express.Router()

router.get('/facultylogin',faculty.facultyLogin)


module.exports=router
