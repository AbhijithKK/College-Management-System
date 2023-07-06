const express =require('express')
const { adminLogin,addStudent, addFaculty, addClub,
     addDepartment, addSemester, addSubject, uploadNotice, 
     dashBord, viewStudents, viewFacultys, viewDepartment, 
     viewSubjects, viewSemester, viewComplaints, viewClubRequests,
      viewApproveLists, deleteStudent, deleteFaculty, deleteDepartment, 
      deleteSubject, deleteSemester, updateFaculty, updateStudent, 
      postupdateStudent,
       postupdateFaculty,
       checkAuth,
       logOut,
       viewClass,
       addClass,
       deleteClass} = require('../controllers/adminControllers')
const upload = require('../heplers/multer')
let router=express.Router()

// <====ADD API====>
router.post('/adminLogin',adminLogin)
router.post('/student',addStudent)
router.post('/faculty',addFaculty)
router.post('/addClub',addClub)
router.post('/department',addDepartment)
router.post('/semester',addSemester)
router.post('/Subject',addSubject)
router.post('/uploadNotice',upload.single('files'),uploadNotice)
router.post('/class',addClass)

// <====VIEW PAGE API====>
router.get('/home',dashBord)
router.get('/students',viewStudents)
router.get('/facultys',viewFacultys)
router.get('/department',viewDepartment)
router.get('/subjects',viewSubjects)
router.get('/semester',viewSemester)
router.get('/viewComplaints',viewComplaints)
router.get('/viewClubRequests',viewClubRequests)
router.get('/viewApproveLists',viewApproveLists)
router.get('/viewApproveLists',viewApproveLists)
router.get('/class',viewClass)
router.get('/checkAuth',checkAuth)
router.get('/logout',logOut)

// <====DELETE API====>
router.get('/deleteStudent',deleteStudent)
router.get('/deleteFaculty',deleteFaculty)
router.get('/deleteDepartment',deleteDepartment)
router.get('/deleteSubject',deleteSubject)
router.get('/deleteSemester',deleteSemester)
router.get('/deleteClass',deleteClass)

// <====UPDATE API====>
router.get('/updateFaculty',updateFaculty)
router.get('/updateStudent',updateStudent)
router.post('/updateStudent',upload.single('image'),postupdateStudent)
router.post('/updateFaculty',upload.single('image'),postupdateFaculty)



module.exports=router
