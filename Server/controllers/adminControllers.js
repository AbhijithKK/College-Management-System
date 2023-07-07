const { studentModel } = require('../models/studentScheema')
const { facultyModel } = require('../models/facultyScheema')
const { club } = require('../models/clubScheema')
const { department } = require('../models/departmentScheema')
const { notice } = require('../models/noticeScheema')
const { semester } = require('../models/semesterScheema')
const { subject } = require('../models/subjectScheema')
const bcript = require('bcrypt')
const { jwtSign, jwtVerify } = require('../heplers/jwt')
const { classScheema } = require('../models/classScheema')
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
                guardianName:req.body.guardianName,
                department: req.body.department,
                admYear: req.body.admYear,
                gender: req.body.gender,
                address: req.body.address,
                DOB: req.body.dob,
                semester: req.body.semester,
                password: password
            }).then(() => res.json('Student Added'))
        } catch (err) {
           res.json(false)
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
                DOB:req.body.dob,
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
            console.log(req.body);
            console.log(req.file);
            notice.create({
                name: req.body.title,
                filePath: req.file.filename
            })
            res.json('notice uploaded')
        } catch (err) {
            res.json(false)
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
        console.log(req.body);
        try {
            subject.create({
                department: req.body.department,
                subject: req.body.datas.subject,
                semester:req.body.datas.semester,
                className:req.body.className
            })
            res.json('subject added')
        } catch (err) {
            console.log(err);
        }
    },
    addClass: (req, res) => {
        console.log(req.body);
        try {
            classScheema.create({
                department: req.body.department,
                className: req.body.className,
                
            })
            res.json('Class added')
        } catch (err) {
            res.json(false)
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
            let Dep=req.query.Dep
            let allStudents 
            if(Dep=='default'){
                 allStudents = await studentModel.find().lean()
            }else{
                allStudents = await studentModel.find({department:Dep}).lean()
            }
            
            res.json(allStudents)
        } catch (err) {
            console.log(err);
        }
    },
    viewFacultys: async (req, res) => {
        try {
            let Dep=req.query.Dep
            let allFacultys
            if(Dep=='default'){
             allFacultys = await facultyModel.find().lean()
            }else{
                allFacultys = await facultyModel.find({department:Dep}).lean()

            }
            res.json(allFacultys)
        } catch (err) {
            response.json(false)
        }
    },
    viewDepartment: async (req, res) => {
        try {
            let allDepartments = await department.find().lean()
            res.json(allDepartments)
            
        } catch (err) {
            res.json(false)
        }
    },
    viewSubjects: async (req, res) => {
        try {
            let dep=req.query.dep
            let allSubjects
            if (dep=='default' ) {
                
                allSubjects = await subject.find().lean()
            }else{

                allSubjects = await subject.find({department:dep}).lean()
            }
            res.json(allSubjects)
        } catch (err) {
            console.log(err);
        }
    },
    viewSemester: async (req, res) => {
        try {
            let allSemesters
            if (req.query.Dep) {
                allSemesters = await semester.find({department:req.query.Dep}).lean()
                res.json(allSemesters)
                return
            }
            allSemesters = await semester.find().lean()
            res.json(allSemesters)
        } catch (err) {
            res.json(false)
        }
    },
    viewClass: async (req, res) => {
        try {
            let allClass
            if (req.query.Dep ) {
             allClass = await  classScheema.find({department:req.query.Dep}).lean()
            res.json(allClass)
            return
            }
            allClass = await  classScheema.find().lean()
            res.json(allClass)
        } catch (err) {
            res.json(false)
            
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
   
    viewApproveLists: async (req, res) => {
        try {
            // let allList=await approveListModel.find()
            // res.json(allList)
        } catch (err) {
            console.log(err);
        }
    },

    // <====DELETE CONTROLLS====>
    deleteStudent: async(req, res) => {
        try {
            let id = req.query.id
          await  studentModel.deleteOne({ _id: id })
               
                res.json('student Data Deleted')
            
        } catch (err) {
            console.log(err);
        }
    },
    deleteFaculty: async(req, res) => {
        try {
            let id = req.query.id
           await facultyModel.deleteOne({ _id: id })
                
                res.json('faculty Deleted')
           
        } catch (err) {
            res.json(false)
        }
    },
    deleteDepartment: async(req, res) => {
        try {
            let id = req.query.id
                await department.deleteOne({ _id: id })
                res.json(true)
        } catch (err) {
            res.json(false)
        }
    },
    deleteSubject: (req, res) => {
        try {
            let id = req.query.id
            subject.deleteOne({ _id: id }).then( () => {
              res.json('subject deleted')
            })
        } catch (err) {
            res.json(false)
            console.log(err);
        }
    },
    deleteClass: (req, res) => {
        try {
            let id = req.query.id
            classScheema.deleteOne({ _id: id }).then( () => {
              res.json('Class deleted')
            })
        } catch (err) {
            res.json(false)
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

    postupdateStudent: async(req, res) => {
        try {
            console.log(req.body);
            const id = req.body.id;
           
           
            const updateData = {
              name: req.body.name,
              email: req.body.email,
              mobNumber: req.body.mobNumber,
              DOB: req.body.dob,
              admYear: req.body.admYear,
              address: req.body.address,
              department: req.body.department,
              gender: req.body.gender,
              guardianName: req.body.guardianName,
              guardianNumber: req.body.guardianNumber,
              semester: req.body.semester,
            };
          
            if (req.file) {
              updateData.image = req.file[0].filename;
            }
          console.log('kk');
            let data= await studentModel.updateOne({ _id: id }, updateData);
          
           console.log(data);
              res.json('Student Data Updated');
            
          } catch (err) {
            
            res.json(false);
          }
          

    },
    postupdateFaculty: async(req, res) => {
        try {
            let id = req.body.id
            const datas={
                name: req.body.name,
                email: req.body.email,
                mobNumber: req.body.mobNumber,
                teachingArea: req.body.teachingArea,
                department: req.body.department,
                admYear: req.body.admYear,
                gender: req.body.gender,
                address: req.body.address,
                DOB: req.body.dob,
                qualifications: req.body.qualifications,
                
            }
            if (req.file) {
                updateData.image = req.file[0].filename;
              }
            facultyModel.updateOne({_id:id} ,datas).then(() => {
                res.json('faculty updated')
            })
        } catch (err) {
            res.json(false)
        }

    },
    updateStudent: async (req, res) => {
        try{
            let id = req.query.id
            
            if (id==undefined) {
                console.log('ijj');
               res.json({
                name: '',
                email: '',
                mobNumber: '',
                DOB: '',
                admYear: '',
                guardianName: '',
                guardianNumber: '',
                address: '',
                department: '',
                gender: '',
                semester: '',
              }) 
              return
            }
        let student = await studentModel.findOne({ _id: id })
        res.json(student)
        }catch(err){
            res.json(false)
        }
    },
    updateFaculty: async (req, res) => {
        try{
        let id = req.query.id
        let faculty = await facultyModel.findOne({ _id: id })
        res.json(faculty)
    }catch(err){
        res.json(false)
    }
    },
    // =======>logout<======
    logOut: (req, res) => {
        res.cookie('jwtAdmin', '').json(true)
    }


}

module.exports = admin