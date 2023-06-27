const { studentModel } = require('../models/studentScheema')
const { facultyModel } = require('../models/facultyScheema')
const { club } = require('../models/clubScheema')
const { department } = require('../models/departmentScheema')
const { notice } = require('../models/noticeScheema')
const { semester } = require('../models/semesterScheema')
const { subject } = require('../models/subjectScheema')
const bcript = require('bcrypt')
const { jwtSign, jwtVerify } = require('../heplers/jwt')
let admin = {

    // <====LOGIN VERIFY====>
    adminLogin: async(req, res) => {
        try{
            console.log(req.body);
        const email = 'admin@gmail.com'
        const password = 'password'
        if (email === req.body.mail && password === req.body.password) {
          
           
            res.cookie('jwtAdmin',await jwtSign(123456),{ withCrdenttitals: true, httpOnly: false, secure: false, sameSite: "none", maxAge: 1000000 })
            .json(true)
        } else {
            res.json(false)
        }
    }catch(err){
        res.json(false)
    }

    }, 
     // <====AUTHENDICATION  VERIFY====>
    checkAuth: async(req, res) => {
        try{
        let loginverify= await jwtVerify(req.cookies.jwtAdmin)
       if (loginverify.data==123456) {
        res.json(true)
       }else{
        res.json(false)
       }
    }catch(err){
        res.json(false)
    }

    },

    // <====ADD CONTROLLS====>
    addStudent: async (req, res) => {
        try {
            let password = 'password'
            password = await bcript.hash(password, 10)
            console.log(req.body);
            studentModel.create({
                name: req.body.names,
                email: req.body.email,
                mobNumber: req.body.mobNumber,
                guardianNo: req.body.guardianNumber,
                department: req.body.department,
                admYear: req.body.admYear,
                gender: req.body.gender,
                address: req.body.address,
                DOB: req.body.dob,
                semester: req.body.semester,
                password: password
            }).then(() => res.json('Student Added'))
        } catch (err) {
            console.log(err);
        }
    },
    addFaculty: async (req, res) => {
        try {
            let password = 'password'
            password = await bcript.hash(password, 10)
            console.log(req.body);
            facultyModel.create({
                name: req.body.names,
                email: req.body.email,
                mobNumber: req.body.mobNumber,
                teachingArea: req.body.teachingArea,
                department: req.body.department,
                admYear: req.body.admYear,
                gender: req.body.gender,
                address: req.body.address,
                DOB: req.body.dob,
                qualifications: req.body.qualification,
                password: password
            }).then(() => res.json("faculty Added"))
        } catch (err) {
            console.log(err);
        }
    },
    addClub: async (req, res) => {
        try {
            club.create({
                name: req.body.names,
                discription: req.body.discription,
                clubAdmin:req.body.clubAdmin
            }).then(() => {
                res.json('club Created')
            })
        } catch (err) {
            console.log(err);
        }
    },
    addDepartment: (req, res) => {
        try {
            department.create({
                name: req.body.departmentName
            })
            res.json('department added')
        } catch (err) {
            console.log(err);
        }
    },
    uploadNotice: (req, res) => {
        try {
            notice.create({
                name: req.body.title,
                filePath: req.file
            })
            res.json('notice uploaded')
        } catch (err) {
            console.log(err);
        }
    },
    addSemester: (req, res) => {
        try {
            semester.create({
                department: req.body.department,
                semester: req.body.semester
            })
            res.json('semester added')
        } catch (err) {
            console.log(err);
        }
    },
    addSubject: (req, res) => {
        try {
            subject.create({
                department: req.body.department,
                subject: req.body.subject
            })
            res.json('subject added')
        } catch (err) {
            console.log(err);
        }
    },
    // <====VIEW CONTROLLS===>

    dashBord: async (req, res) => {
        try {
            let totalStudent = await studentModel.count()
            let totalFaculty = await facultyModel.count()
            let totalClubs = await club.count()
            res.json({ student: totalStudent, faculty: totalFaculty, clubs: totalClubs })
        } catch (err) {
            console.log(err);
        }
    },
    viewStudents: async (req, res) => {
        try {
            let allStudents = await studentModel.find().lean()
            res.json(allStudents)
        } catch (err) {
            console.log(err);
        }
    },
    viewFacultys: async (req, res) => {
        try {
            let allFacultys = await facultyModel.find()
            res.json(allFacultys)
        } catch (err) {
            console.log(err);
        }
    },
    viewDepartment: async (req, res) => {
        try {
            let allDepartments = await department.find()
            res.json(allDepartments)
            
        } catch (err) {
            res.json(false)
        }
    },
    viewSubjects: async (req, res) => {
        try {
            let allSubjects = await subject.find()
            res.json(allSubjects)
        } catch (err) {
            console.log(err);
        }
    },
    viewSemester: async (req, res) => {
        try {
            let allSemesters = await semester.find()
            res.json(allSemesters)
        } catch (err) {
            console.log(err);
        }
    },
    viewComplaints: async (req, res) => {
        try {
            // let allCompliants=await complaintModel.find()
            // res.json(allCompliants)
        } catch (err) {
            console.log(err);
        }
    },
    viewClubRequests: async (req, res) => {
        try {
            // let allRequests=await clubRequestsModel.find()
            // res.json(allRequests)
        } catch (err) {
            console.log(err);
        }
    },
    viewApproveLists: async (req, res) => {
        try {
            // let allList=await approveListModel.find()
            // res.json(allList)
        } catch (err) {
            console.log(err);
        }
    },

    // <====DELETE CONTROLLS====>
    deleteStudent: (req, res) => {
        try {
            let id = req.query.id
            studentModel.deleteOne({ _id: id }).then(async () => {
                let updatestudents = await studentModel.find().lean()
                res.json(updatestudents)
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteFaculty: (req, res) => {
        try {
            let id = req.query.id
            facultyModel.deleteOne({ _id: id }).then(async () => {
                let updateFacultys = await facultyModel.find().lean()
                res.json(updateFacultys)
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteDepartment: async(req, res) => {
        try {
            let id = req.query.id
                await department.deleteOne({ _id: id })
                res.json(true)
        } catch (err) {
            console.log(false);
        }
    },
    deleteSubject: (req, res) => {
        try {
            let id = req.query.id
            subject.deleteOne({ _id: id }).then(async () => {
                let updateSubject = await subject.find().lean()
                res.json(updateSubject)
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteSemester: (req, res) => {
        try {
            let id = req.query.id
            semester.deleteOne({ _id: id }).then(async () => {
               
                res.json('Semester Deleted')
            })
        } catch (err) {
           res.json(false)
        }
    },

    // <====UPDATE CONTROLLS====>

    postupdateStudent: (req, res) => {
        try {
            let id = req.query.id
            studentModel.updateOne({ _id: id }, {
                name: req.body.name,
                email: req.body.email,
                mobNumber: req.body.mobNumber,
                teachingArea: req.body.teachingArea,
                department: req.body.department,
                admYear: req.body.admYear,
                gender: req.body.gender,
                address: req.body.address,
                DOB: req.body.DOB,
                qualifications: req.body.qualifications,
                image: req.file[0].filename
            }).then(() => {
                res.json('ok')
            })
        } catch (err) {
            console.log(err);
        }

    },
    postupdateFaculty: (req, res) => {
        try {
            let id = req.query.id
            studentModel.updateOne({ _id: id }, {
                name: req.body.name,
                email: req.body.email,
                mobNumber: req.body.mobNumber,
                teachingArea: req.body.teachingArea,
                department: req.body.department,
                admYear: req.body.admYear,
                gender: req.body.gender,
                address: req.body.address,
                DOB: req.body.DOB,
                qualifications: req.body.qualifications,
                image: req.file[0].filename
            }).then(() => {
                res.json('ok')
            })
        } catch (err) {
            console.log(err);
        }

    },
    updateStudent: async (req, res) => {
        let id = req.query.id
        let student = await studentModel.findOne({ _id: id })
        res.json(student)
    },
    updateFaculty: async (req, res) => {
        let id = req.query.id
        let faculty = await facultyModel.findOne({ _id: id })
        res.json(faculty)
    },
    // =======>logout<======
    logOut: (req, res) => {
        res.cookie('jwtAdmin', '').json(true)
    }


}

module.exports = admin