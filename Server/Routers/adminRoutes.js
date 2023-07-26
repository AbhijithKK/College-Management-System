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
       deleteClass,
       deleteComplaint,
       deleteRequests,
       UpdateRequests} = require('../controllers/adminControllers')
const upload = require('../heplers/multer')
const { adminAuth } = require('../middlewere/adminMiddlewere')
let router=express.Router()

// <====ADD API====>
router.post('/adminLogin',adminLogin)
router.post('/student',adminAuth,addStudent)
router.post('/faculty',adminAuth,addFaculty)
router.post('/addClub',adminAuth,addClub)
router.post('/department',adminAuth,addDepartment)
router.post('/semester',adminAuth,addSemester)
router.post('/Subject',adminAuth,addSubject)
router.post('/uploadNotice',adminAuth,upload.single('files'),uploadNotice)
router.post('/class',adminAuth,addClass)

// <====VIEW PAGE API====>
router.get('/home',adminAuth,dashBord)
router.get('/students',adminAuth,viewStudents)
router.get('/facultys',adminAuth,viewFacultys)
router.get('/department',adminAuth,viewDepartment)
router.get('/subjects',adminAuth,viewSubjects)
router.get('/semester',adminAuth,viewSemester)
router.get('/complaints',adminAuth,viewComplaints)
router.get('/approvelists',adminAuth,viewApproveLists)
router.get('/class',adminAuth,viewClass)
router.get('/checkAuth',checkAuth)
router.get('/logout',logOut)

// <====DELETE API====>
router.delete('/approvelists',adminAuth,deleteRequests)
router.get('/deleteStudent',adminAuth,deleteStudent)
router.get('/deleteFaculty',adminAuth,deleteFaculty)
router.get('/deleteDepartment',adminAuth,deleteDepartment)
router.get('/deleteSubject',adminAuth,deleteSubject)
router.get('/deleteSemester',adminAuth,deleteSemester)
router.get('/deleteClass',adminAuth,deleteClass)
router.get('/deleteComplaint',adminAuth,deleteComplaint)

// <====UPDATE API====>
router.get('/updateRequests',adminAuth,UpdateRequests)
router.get('/updateFaculty',adminAuth,updateFaculty)
router.get('/updateStudent',adminAuth,updateStudent)
router.post('/updateStudent',adminAuth,upload.single('image'),postupdateStudent)
router.post('/updateFaculty',adminAuth,upload.single('image'),postupdateFaculty)



module.exports=router
