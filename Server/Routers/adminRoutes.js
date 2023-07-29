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
       UpdateRequests,
       payment,
       viewPayment,
       deletePayment} = require('../controllers/adminControllers')
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
router.post('/payment',adminAuth,payment)


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
router.post('/payment',adminAuth,viewPayment)
router.get('/checkAuth',checkAuth)
router.get('/logout',logOut)

// <====DELETE API====>
router.delete('/approvelists',adminAuth,deleteRequests)
router.delete('/payment',adminAuth,deletePayment)
router.delete('/student',adminAuth,deleteStudent)
router.delete('/faculty',adminAuth,deleteFaculty)
router.delete('/department',adminAuth,deleteDepartment)
router.delete('/subject',adminAuth,deleteSubject)
router.delete('/semester',adminAuth,deleteSemester)
router.delete('/class',adminAuth,deleteClass)
router.delete('/complaint',adminAuth,deleteComplaint)

// <====UPDATE API====>
router.get('/updateRequests',adminAuth,UpdateRequests)
router.get('/updateFaculty',adminAuth,updateFaculty)
router.get('/updateStudent',adminAuth,updateStudent)
router.post('/updateStudent',adminAuth,upload.single('image'),postupdateStudent)
router.post('/updateFaculty',adminAuth,upload.single('image'),postupdateFaculty)



module.exports=router
