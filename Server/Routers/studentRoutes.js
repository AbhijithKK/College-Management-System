const express = require('express')
const student = require('../controllers/studentControllers')
const upload = require('../heplers/multer')
const router = express.Router()

router.get('/profile', student.getProfile)
router.get('/attendance', student.getAttendance)
router.get('/result', student.getResult)
router.get('/clubs', student.getClubs)
router.get('/checknotice', student.getNotice)
router.get('/leaveStatus',student.getLeaveLetterStatus)
router.get('/notificationCalander',student.getNotificationCalender)
router.get('/payment',)
router.get('/checkAuth',student.checkAuth)
router.get('/logout',student.logOut)
router.get('/clubstatus',student.getclubStatus)

router.post('/login', student.studentLogin)
router.post('/addcomplaint')
router.post('/clubs', student.postClub)
router.post('/updateprofile',upload.single('image'), student.postProfile)
router.post('/changepassword', student.postPassword)
router.post('/leaveletter', student.postLeaveLetter)
router.post('/addcomplaint', student.postComplaint)
router.post('/verifymail',student.postMailVerify)



module.exports = router