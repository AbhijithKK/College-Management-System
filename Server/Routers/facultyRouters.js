const express=require('express')
const faculty = require('../controllers/facultyControllers')
const upload = require('../heplers/multer')
const router=express.Router()

router.get('/checkAuth',faculty.checkAuth)
router.get('/profile',faculty.getProfile)
router.get('/logout',faculty.logOut)

router.post('/login', faculty.facultyLogin)
router.post('/updateprofile',upload.single('image'), faculty.postProfile)
router.post('/verifymail',faculty.postMailVerify)
router.post('/changepassword', faculty.postPassword)

module.exports=router
