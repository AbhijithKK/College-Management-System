const express=require('express')
const student = require('../controllers/studentControllers')
const router=express.Router()

router.get('/studentlogin',student.studentLogin)
router.get('/profile',)
router.get('/attendance',)
router.get('/result',)
router.get('/joinclub',)
router.get('/checknotice',)
router.get('/addcompliant',)
router.get('/payment',)
router.get('/logout',)
router.get('/changepassword',)

router.post('addcomplaint')

router.post('updateprofile')
router.post('changepassword')


module.exports=router