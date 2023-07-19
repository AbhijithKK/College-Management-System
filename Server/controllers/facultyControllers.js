const bcrypt = require("bcrypt")
const { facultyModel } = require("../models/facultyScheema")
const { jwtSign, jwtVerify } = require("../heplers/jwt")

const { club } = require("../models/clubScheema")



const otpGenerator = require('otp-generator')
const nodeMail = require("../heplers/nodeMailer")
const { clubRequestScheema } = require("../models/clubRequestsModel")
const { leaveApplyScheema } = require("../models/studentLeaveapply")
const { department } = require("../models/departmentScheema")
const { classScheema } = require("../models/classScheema")
const { studentModel } = require("../models/studentScheema")
const { resultScheema } = require("../models/resultScheema")

const { attendenceScheema } = require("../models/attendance")
const { complaintScheema } = require("../models/complaintMode")
const { subject } = require("../models/subjectScheema")
const { notice } = require("../models/noticeScheema")
const { semester } = require("../models/semesterScheema")

const OtpGen = () => {
    return otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false, lowerCaseAlphabets: false
    });
}

let faculty = {
    // ========>LOGIN VERIFY<=========
    facultyLogin: async (req, res) => {
        try {
            let data = await facultyModel.findOne({ email: req.body.email })
            console.log(data);
            if (data === null) {
                res.json(false)
            } else {
                let datas = await bcrypt.compare(req.body.password, data.password)
                if (datas === true) {
                    res.cookie('facultyjwt', await jwtSign(data._id), { withCrdenttitals: true, httpOnly: false, secure: false, sameSite: "none", maxAge: 1000000 })
                        .json(true)

                } else {
                    res.json(false)
                }
            }
        } catch (err) {
            res.json(false)
        }

    },
    // ======>AUTHENDICATION CHECK<========
    checkAuth: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            console.log(verify);
            let data = await facultyModel.findOne({ _id: verify.data })
            if (data !== null) {
                res.json(true)
            } else {
                res.json(false)
            }
        } catch (err) {
            res.json(false)
        }

    },
    // =====>GET APIS<======
    getProfile: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let data = await facultyModel.findOne({ _id: verify.data })
            if (data !== null) {
                res.json(data)
            } else {
                res.json(false)
            }
            // ==============================================================


        } catch (err) {
            res.json(false)
        }
    },
    viewClubRequests: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let allRequests
            if (req.query.search) {
                let key=req.query.search.replace(/[^a-bA-B]/g,"").replace(/[^a-bA-B]/g,"")
                allRequests = await clubRequestScheema.find({ clubAdminId: verify.data, studentName: new RegExp(key, 'i') }).sort({ _id: -1 }).exec()
            } else {
                allRequests = await clubRequestScheema.find({ clubAdminId: verify.data }).sort({ _id: -1 }).exec()
            }
            res.json(allRequests)
        } catch (err) {
            res.json(false)
        }
    },
    ViewLeaveLetters: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let faculty1 = await facultyModel.findOne({ _id: verify.data })
            let allLeaveletters
            if (req.query.search) {
                let key=req.query.search.replace(/[^a-bA-B]/g,"").replace(/[^a-bA-B]/g,"")
                allLeaveletters = await leaveApplyScheema.find({ studentName: new RegExp(key, 'i') }).sort({ _id: -1 }).exec()
            } else {
                allLeaveletters = await leaveApplyScheema.find().sort({ _id: -1 }).exec()
            }
            let arr = []
            if (allLeaveletters !== null) {
                for (let i = 0; i < allLeaveletters.length; i++) {
                    if (faculty1.adminOfClass == allLeaveletters[i].className) {
                        allLeaveletters[i].adminName = await faculty1.name
                        arr.push(allLeaveletters[i])
                    }
                }
            }

            res.json(arr)
        } catch (err) {

            res.json(false)
        }
    },
    ViewStudents: async (req, res) => {
        try {
            let data = await studentModel.find({ $and: [{ department: req.query.dep }, { semester: req.query.sem }] }).lean()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    },
    getAttendance: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let data = await facultyModel.findOne({ _id: verify.data })
            let todayDate = new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
            let key=req.query.search.replace(/[^a-bA-B]/g,"").replace(/[^a-bA-B]/g,"")
            let temp = await attendenceScheema.find({ $and: [{ date: todayDate }, { facultyId: data._id }, { className: data.adminOfClass },{studentName:new RegExp(key,'i')}] }).lean()

            if (temp.length == 0) {
                let stdnt = await studentModel.find({ $and: [{ department: data.department }, { className: data.adminOfClass },{name:new RegExp(key,'i') }] }).lean()
                let Array = []
                if (stdnt.length == 0) {
                    res.json(Array)
                } else {
                    for (let i = 0; i < stdnt.length; i++) {
                        let stdnts = {
                            date: new Date().toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            }),
                            studentName: stdnt[i].name,
                            studentId: stdnt[i]._id,
                            facultyName: data.name,
                            facultyId: data._id,
                            className: data.adminOfClass,
                            department: data.department,
                            status: 'Not Marked'
                        }
                        Array.push(stdnts)

                    }
                    console.log('kk', Array);
                    res.json(Array)
                }
            } else {
                let stdnt = await studentModel.find({ $and: [{ department: data.department }, { className: data.adminOfClass },{name:new RegExp(key,'i')}] }).lean()
                let Array = []
                if (stdnt.length == 0) {
                    res.json(Array)
                } else {
                    for (let i = 0; i < stdnt.length; i++) {
                        let status = 'Not Marked'
                        let stdnts = {
                            date: new Date().toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            }),
                            studentName: stdnt[i].name,
                            studentId: stdnt[i]._id,
                            facultyName: data.name,
                            facultyId: data._id,
                            className: data.adminOfClass,
                            department: data.department,
                            status: status
                        }
                        Array.push(stdnts)
                    }
                    for (let j = 0; j < temp.length; j++) {
                        for (let k = 0; k < Array.length; k++) {
                            if (temp[j].studentId == Array[k].studentId) {
                                Array[k].status = temp[j].status
                            }

                        }
                    }
                }
                console.log('kk', Array);
                res.json(Array)
            }

        } catch (Err) {
            console.log(Err);
            res.json(false)
        }
    }
    ,
    getDepWiseStudents: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let faculty = await facultyModel.findOne({ _id: verify.data })
            
            let data = await studentModel.find({ department: faculty.department ,name:new RegExp(req.query.search,'i')}).sort({ name: 1 }).exec()
            console.log(data);
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    },
    getAdminClubs: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let key = req.query.search.replace(/[^a-zA-Z]/g, "").replace(/[^a-bA-B]/g, "");

            console.log(key,'ll',req.query.search);
            let clubs = await club.find({ clubAdminId: verify.data ,name:new RegExp(key)}).sort({ _id: -1 }).exec()
            res.json(clubs)
        } catch (err) {
            res.json(false)
        }
    },
    DeleteClubs: async (req, res) => {
        try {
            await club.deleteOne({ _id: req.query.id })
            res.json(true)
        } catch (err) {
            res.json(false)
        }
    },
    DeleteClubRequest: async (req, res) => {
        try {
            await clubRequestScheema.deleteOne({ _id: req.query.id })
            res.json(true)
        } catch (err) {
            res.json(false)
        }
    },
    viewClass: async (req, res) => {
        try {
            let allClass
            if (req.query.Dep && req.query.Sem) {
                allClass = await classScheema.find({ $and: [{ department: req.query.Dep }, { semester: req.query.Sem }] }).lean()
            } else if (req.query.Dep) {
                allClass = await classScheema.find({ department: req.query.Dep }).lean()
            } else {

                allClass = await classScheema.find().lean()
            }
            res.json(allClass)
        } catch (err) {
            res.json(false)

        }
    },
    viewSubjects: async (req, res) => {
        try {
            let dep = req.query.dep
            let allSubjects

            if (dep == 'default') {

                allSubjects = await subject.find().sort({ _id: -1 }).exec()
            } else if (req.query.dep && req.query.sem) {

                allSubjects = await subject.find({ $and: [{ department: dep }, { semester: req.query.sem }] }).sort({ _id: -1 }).exec()
            } else if (req.query.dep) {
                allSubjects = await subject.find({ department: dep }).sort({ _id: -1 }).exec()
            } else {
                allSubjects = await subject.find().sort({ _id: -1 }).exec()
            }
            res.json(allSubjects)
        } catch (err) {

        }
    },
    viewSemester: async (req, res) => {
        try {
            let allSemesters
            if (req.query.Dep) {
                allSemesters = await semester.find({ department: req.query.Dep }).lean()
                res.json(allSemesters)
                return
            }
            allSemesters = await semester.find().lean()
            res.json(allSemesters)
        } catch (err) {
            res.json(false)
        }
    },
    viewDepartment: async (req, res) => {
        try {
            let allDepartments = await department.find().sort({ _id: -1 }).exec()
            res.json(allDepartments)

        } catch (err) {
            res.json(false)
        }
    },
    getNotice: async (req, res) => {
        try {
            let key=req.query.search.replace(/[^a-zA-Z]/g,"").replace(/[^a-zA-Z]/g,"")
            let data = await notice.find({name:new RegExp(key,'i')}).sort({ _id: -1 }).exec()
            res.json(data)
        } catch (err) {
            res.json(false)
        }
    },
    // ======>PROFILE UPDATE<=====
    postProfile: async (req, res) => {
        try {
            let verify = await jwtVerify(req.cookies.facultyjwt)
            let id = verify.data

            let updateData = {
                name: req.body.name,
                email: req.body.email,
                mobNumber: req.body.mobNumber,
                DOB: req.body.dob,
                gender: req.body.gender,
                admYear: req.body.admYear,
                department: req.body.department,
                semester: req.body.semester,
                qualifications: req.body.qualifications,
                teachingArea: req.body.teachingArea,
                address: req.body.address,
            };

            if (req.file !== undefined) {

                updateData.image = await req.file.filename;

            }

            let data = await facultyModel.updateOne({ _id: id }, updateData);

            console.log(data);
            res.json('Faculty Data Updated');

        } catch (err) {

            res.json(false);
        }
    },
    postMailVerify: async (req, res) => {
        try {
            let data = await facultyModel.findOne({ $or: [{ email: req.body.data }, { mobNumber: req.body.data }] })
            const subject = "COLLEGE MANAGEMENT SYSTEM ✔"
            if (data !== null) {
                let otp = OtpGen()
                let OTP = `Your OTP: ${otp}`
                nodeMail(data.email, OTP, subject)
                res.json({ otp: otp })
            } else {
                res.json({ otp: false, text: 'Enter Your Registerd Email or Mobile Number' })
            }
            console.log(data);
        } catch (err) {
            res.json(false)
        }
    },
    postPassword: async (req, res) => {
        try {

            let data = await jwtVerify(req.cookies.facultyjwt)
            let newPassword = await bcrypt.hash(req.body.pass, 10)
            await facultyModel.updateOne({ _id: data.data }, { password: newPassword })

            req.json('password updated')
        } catch (err) {
            res.json(false)
        }
    },
    clubRequest: async (req, res) => {
        try {
            const data = await clubRequestScheema.create({
                studentName: req.body.studentName,
                department: req.body.department,
                semester: req.body.semester,
                clubName: req.body.clubName,
                status: req.body.status,
                clubAdminId: req.body.clubAdminId,
                clubAdminName: req.body.clubAdminName,
                studentId: req.body.studentId,
                clubId: req.body.clubId
            });


            if (data !== null) {
                res.json('Club Request sent successfully');
            } else {
                res.json(false);
            }
        } catch (err) {
            res.json(false);
        }
    },
    clubRequestUpdate: async (req, res) => {
        try {
            await clubRequestScheema.updateOne({ _id: req.body.id }, { status: req.body.status })
            res.json(true)
        } catch (err) {
            res.json(false)
        }
    },
    LeaveStatusUpdate: async (req, res) => {
        try {
            console.log(req.body);
            let data = await leaveApplyScheema.updateOne({ _id: req.body.id }, { status: req.body.status, adminName: req.body.adminName })
            console.log(data);
            res.json(true)
        } catch (err) {
            res.json(false)
        }
    },
    PostResult: async (req, res) => {
        try {
            console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
            let data = await resultScheema.create({
                department: req.body.department,
                semester: req.body.semester,
                className: req.body.className,
                mark: req.body.mark,
                grade: req.body.grade,
                studentId: req.body.studentId,
                subject: req.body.subject

            })
            console.log(data);
            res.json(true)
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    postAttendance: async (req, res) => {
        try {
            let details = req.body.details
            let temp = await attendenceScheema.find({ $and: [{ date: req.body.details.date }, { studentId: req.body.details.studentId }, { className: req.body.details.className }] }).lean()

            if (temp.length == 0) {

                let data = await attendenceScheema.create(details)
                console.log('created', data);
            } else {
                let update = await attendenceScheema.updateOne({ _id: temp[0]._id }, {
                    date: req.body.details.date,
                    studentName: req.body.details.studentName,
                    studentId: req.body.details.studentId,
                    facultyName: req.body.details.facultyName,
                    facultyId: req.body.details.facultyId,
                    className: req.body.details.className,
                    department: req.body.details.department,
                    status: req.body.details.status,
                })
                console.log('ntgggggggggggggg', update);
            }


        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    postComplaint: async (req, res) => {
        try {
            let data = await jwtVerify(req.cookies.facultyjwt)
            let faculty = await facultyModel.findOne({ _id: data.data })

            await complaintScheema.create({
                title: req.body.title,
                content: req.body.content,
                name: faculty.name,
                date: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
                who: 'Faculty',
                complainterId: faculty._id,
                department: faculty.department,
                className: faculty.adminOfClass,
                teachingArea: faculty.teachingArea
            })
            res.json(true)

        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    applyPassword: async (req, res) => {
        try {


            let newPassword = await bcrypt.hash(req.body.newpass, 10)
            let data = await facultyModel.updateOne({ email: req.body.email }, { password: newPassword })

            req.json('password updated')
        } catch (err) {
            res.json(false)
        }
    },
    ForgotPass: async (req, res) => {
        try {
            let data = await facultyModel.findOne({ email: req.body.email })

            if (data != null) {
                let otp = OtpGen()
                const subject = "COLLEGE MANAGEMENT SYSTEM ✔"
                let OTP = `Your OTP: ${otp}`
                nodeMail(req.body.email, OTP, subject)

                res.json({ otp: otp, text: '' })
            } else {
                res.json({ otp: false, text: 'Plese Enter Registered Email' })
            }
        } catch (err) {
            console.log(err);
            res.json(false)
        }
    },
    // =======>logout<=======
    logOut: (req, res) => {
        res.cookie('facultyjwt', '').json(true)
    }
}

module.exports = faculty