const express = require('express')
const student = require('../controllers/studentControllers')
const router = express.Router()

router.get('/studentlogin', student.studentLogin)
router.get('/profile', student.getProfile)
router.get('/attendance', student.getAttendance)
router.get('/result', student.getResult)
router.get('/clubs', student.getClubs)
router.get('/checknotice', student.getNotice)
router.get('/leaveStatus',student.getLeaveLetterStatus)
router.get('/notificationCalander',student.getNotificationCalender)
router.get('/payment',)
router.get('/logout',student.logOut)

router.post('addcomplaint')
router.post('/clubs', student.postClub)
router.post('updateprofile', student.postProfile)
router.post('changepassword', student.postPassword)
router.post('leaveletter', student.postLeaveLetter)
router.post('addcomplaint', student.postComplaint)


module.exports = router