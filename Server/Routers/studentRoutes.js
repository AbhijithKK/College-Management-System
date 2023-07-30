const express = require('express')
const student = require('../controllers/studentControllers')
const upload = require('../heplers/multer')
const { studentAuth } = require('../middlewere/studentMiddlewere')
const router = express.Router()

router.get('/profile',studentAuth, student.getProfile)
router.get('/attendence',studentAuth, student.getAttendance)
router.get('/result',studentAuth, student.getResult)
router.get('/clubs',studentAuth, student.getClubs)
router.get('/checknotice',studentAuth, student.getNotice)
router.get('/leaveStatus',studentAuth,student.getLeaveLetterStatus)
router.get('/notificationCalander',studentAuth,student.getNotificationCalender)
router.get('/clubstatus',studentAuth,student.getclubStatus)
router.get('/leaveletters',studentAuth,student.getLeaveletters)
router.get('/semester',studentAuth,student.viewSemester)
router.get('/department',studentAuth,student.viewDepartment)
router.get('/calender',studentAuth,student.calander)
router.get('/payment',studentAuth,student.viewPayment)
router.get('/paymentSuccess',studentAuth,student.PaymentSuccess)
router.get('/paymentCancel',studentAuth,student.PaymentCancel)

router.post('/payment',studentAuth,student.viewPaymentPost)
router.post('/applypassword',student.applyPassword)
router.post('/forgotPassword',student.ForgotPass)
router.get('/logout',student.logOut)

router.get('/checkAuth',student.checkAuth)
router.post('/login', student.studentLogin)

router.post('/clubs',studentAuth, student.postClub)
router.post('/updateprofile',studentAuth,upload.single('image'), student.postProfile)
router.post('/changepassword',studentAuth, student.postPassword)
router.post('/leaveletter',studentAuth, student.postLeaveLetter)
router.post('/addcomplaint',studentAuth, student.postComplaint)
router.post('/verifymail',studentAuth,student.postMailVerify)
router.post('/clubRequest',studentAuth,student.clubRequest)




module.exports = router