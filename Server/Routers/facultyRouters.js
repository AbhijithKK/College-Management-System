const express=require('express')
const faculty = require('../controllers/facultyControllers')
const upload = require('../heplers/multer')
const { facultyAuth } = require('../middlewere/facultyMiddlewere')
const { route } = require('express-cookie/lib/application')
const router=express.Router()

router.get('/ClubRequests',facultyAuth,faculty.viewClubRequests)
router.get('/profile',facultyAuth,faculty.getProfile)
router.get('/leaveletters',facultyAuth,faculty.ViewLeaveLetters)
router.get('/studentlist',facultyAuth,faculty.ViewStudents)
router.get('/attendence',facultyAuth,faculty.getAttendance)
router.get('/logout',faculty.logOut)
router.get('/studentdepwise',facultyAuth,faculty.getDepWiseStudents)
router.get('/clubs',facultyAuth,faculty.getAdminClubs)
router.get('/deleteclubs',facultyAuth,faculty.DeleteClubs)
router.get('/deleteclubRequest',facultyAuth,faculty.DeleteClubRequest)
router.get('/class',facultyAuth,faculty.viewClass)
router.get('/subjects',facultyAuth,faculty.viewSubjects)
router.get('/semester',facultyAuth,faculty.viewSemester)
router.get('/department',facultyAuth,faculty.viewDepartment)
router.get('/checknotice',facultyAuth,faculty.getNotice)

router.get('/checkAuth',faculty.checkAuth)
router.post('/login', faculty.facultyLogin)

router.post('/updateprofile',facultyAuth,upload.single('image'), faculty.postProfile)
router.post('/verifymail',facultyAuth,faculty.postMailVerify)
router.post('/changepassword',facultyAuth,facultyAuth, faculty.postPassword)
router.post('/clubRequest',facultyAuth,faculty.clubRequest)
router.post('/clubrequestupdate',facultyAuth,faculty.clubRequestUpdate)
router.post('/leaveletterStatus',facultyAuth,faculty.LeaveStatusUpdate)
router.post('/result',facultyAuth,faculty.PostResult)
router.post('/attendence',facultyAuth,faculty.postAttendance)
router.post('/addcomplaint',facultyAuth, faculty.postComplaint)
router.post('/applypassword',faculty.applyPassword)
router.post('/forgotPassword',faculty.ForgotPass)
router.post('/shedulemeeting',facultyAuth,faculty.sheduleMeeting)
router.get('/deletemeeting',facultyAuth,faculty.deleteMeeting)
router.get('/clubstudent',facultyAuth,faculty.GetClubStudents)
router.get('/previousattendance',facultyAuth,faculty.PreviousAttendance)

module.exports=router 
